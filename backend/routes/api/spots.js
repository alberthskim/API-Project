const express = require("express");
const router = express.Router();
const {
  User,
  Spot,
  Booking,
  Review,
  SpotImage,
  ReviewImage,
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

//get all spots owned by the Current User - DONE
router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
      },
    ],
  });

  const allSpots = [];
  spots.forEach((spot) => {
    let total = 0;
    const json = spot.toJSON();
    json.Reviews.forEach((review) => {
      total += review.stars;
    });

    const average = total / json.Reviews.length;
    json.avgRating = average;

    json.SpotImages.forEach((image) => {
      if (image.preview) {
        json.previewImage = image.url;
      } else {
        json.previewImage = "Image Not Found";
      }
    });

    delete json.Reviews;
    delete json.SpotImages;
    allSpots.push(json);
  });

  res.json({ Spots: allSpots });
});

//get details of a spot from an id - DONE
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  let detailSpot = spot.toJSON();

  const reviewsCount = await Review.count({
    where: {
      spotId: req.params.spotId,
    },
  });

  const starsSum = await Review.sum("stars", {
    where: {
      spotId: req.params.spotId,
    },
  });

  let average = (starsSum / reviewsCount).toFixed(1);
  detailSpot.numReviews = reviewsCount;
  detailSpot.avgStarRating = average;

  res.json(detailSpot);
});

//get all spots - DONE
router.get("/", async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  let where = {};

  page = parseInt(page);
  size = parseInt(size);

  if (!page) page = 1;
  if (page > 10) page = 10;
  if (!size || size > 20) size = 20;

  let errors = {};

  if (page < 1) {
    errors.page = "Page must be greater than or equal to 1";
  }

  if (size < 1) {
    errors.size = "Size must be greater than or equal to 1";
  }

  if (isNaN(maxLat) && maxLat !== undefined) {
    errors.maxLat = "Maximum latitude is invalid";
  }

  if (isNaN(minLat) && minLat !== undefined) {
    errors.minLat = "Minimum latitude is invalid";
  }

  if (minPrice < 0) {
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  }

  if (maxPrice < 0) {
    errors.maxPrice = "Maximum price must be greater than or equal to 0";
  }

  if (Object.keys(errors).length) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: errors,
    });
  }

  if (Number(minLat)) {
    where.lat = { [Op.gte]: Number(minLat) };
  }

  if (Number(maxLat)) {
    where.lat = { [Op.lte]: Number(maxLat) };
  }

  if (Number(minLat) && Number(maxLat)) {
    where.lat = { [Op.between]: [Number(minLat), Number(maxLat)] };
  }

  if (Number(minLng)) {
    where.lng = { [Op.gte]: Number(minLng) };
  }

  if (Number(maxLng)) {
    where.lng = { [Op.lte]: Number(maxLng) };
  }

  if (Number(minLng) && Number(maxLng)) {
    where.lng = { [Op.between]: [Number(minLng), Number(maxLng)] };
  }

  if (Number(minPrice)) {
    where.price = { [Op.gte]: Number(minPrice) };
  }

  if (Number(maxPrice)) {
    where.price = { [Op.lte]: Number(maxPrice) };
  }

  if (Number(minPrice) && Number(maxPrice)) {
    where.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
  }

  let pagination = {};

  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  const spots = await Spot.findAll({
    where,
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
      },
    ],
    ...pagination,
  });

  const allSpots = [];
  spots.forEach((spot) => {
    let total = 0;
    const json = spot.toJSON();
    json.Reviews.forEach((review) => {
      total += review.stars;
    });

    const average = total / json.Reviews.length;
    json.avgRating = average;

    json.SpotImages.forEach((image) => {
      if (image.preview) {
        json.previewImage = image.url;
      } else {
        json.previewImage = "No Preview Image Available. Come Back Later!";
      }
    });

    delete json.Reviews;
    delete json.SpotImages;
    allSpots.push(json);
  });

  res.json({ Spots: allSpots, page, size });
});

//create a spot - DONE
router.post("/", requireAuth, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let errors = {};

  if (!address) {
    errors.address = "Street address is required";
  }
  if (!city) {
    errors.city = "City is required";
  }
  if (!state) {
    errors.state = "State is required";
  }
  if (!country) {
    errors.country = "Country is required";
  }
  if (!lat || typeof lat !== "number") {
    errors.lat = "Latitude is not valid";
  }
  if (!lng || typeof lng !== "number") {
    errors.lng = "Longitude is not valid";
  }
  if (!name || name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    errors.description = "Description is required";
  }
  if (!price || typeof price !== "number") {
    errors.price = "Price per day is required";
  }

  if (Object.keys(errors).length) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: errors,
    });
  }
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201);
  return res.json(newSpot);
});

//Add an image to a Spot based on the Spot's id - DONE
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const user = req.user;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  //check to see if it matches the owner
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    res.status(403);
    return res.json({
      message: "Spot must be owned by the User",
    });
  }

  const addImage = await SpotImage.create({
    url,
    preview,
  });

  await spot.addSpotImages(addImage);

  return res.json({
    id: addImage.id,
    url: addImage.url,
    preview: addImage.preview,
  });
});

//Edit a Spot - DONE
router.put("/:spotId", requireAuth, async (req, res) => {
  const user = req.user;
  console.log(user.id);
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    res.status(403);
    return res.json({
      message: "Spot must belong to current user",
    });
  }

  let errors = {};

  if (!address) {
    errors.address = "Street address is required";
  }
  if (!city) {
    errors.city = "City is required";
  }
  if (!state) {
    errors.state = "State is required";
  }
  if (!country) {
    errors.country = "Country is required";
  }
  if (!lat || typeof lat !== "number") {
    errors.lat = "Latitude is not valid";
  }
  if (!lng || typeof lng !== "number") {
    errors.lng = "Longitude is not valid";
  }
  if (!name || name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    errors.description = "Description is required";
  }
  if (!price || typeof price !== "number") {
    errors.price = "Price per day is required";
  }

  if (Object.keys(errors).length) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: errors,
    });
  }

  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;

  await spot.save();

  res.json(spot);
});

//Delete a Spot - DONE
router.delete("/:spotId", requireAuth, async (req, res) => {
  const user = req.user;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    res.status(403);
    return res.json({
      message: "Spot must be owned by current user",
    });
  }

  spot.destroy();

  return res.json({
    message: "Successfully deleted",
  });
});

//Get all Reviews By a Spot's id - DONE.
router.get("/:spotId/reviews", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  res.json({ Reviews: reviews });
});

//Create a review for a Spot based on the Spot's id - DONE
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  let { review, stars } = req.body;
  let user = req.user;
  const spot = await Spot.findByPk(req.params.spotId);
  const userReview = await Review.findOne({
    where: {
      spotId: req.params.spotId,
      userId: user.id,
    },
  });

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId === user.id) {
    res.status(403);
    return res.json({
      message: "Cannot leave review on your own spot!",
    });
  }

  if (userReview) {
    res.status(500);
    return res.json({
      message: "User already has a review for this spot",
    });
  }

  let errors = {};

  if (!review) {
    errors.review = "Review text is required";
  }
  if (!stars || stars < 0 || stars > 5 || typeof stars !== "number") {
    errors.stars = "Stars must be an integer from 1 to 5";
  }

  if (Object.keys(errors).length) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: errors,
    });
  }

  const newReview = await Review.create({
    userId: user.id,
    spotId: spot.id,
    review,
    stars,
  });

  res.status(201);
  return res.json(newReview);
});

//Get all Bookings for a Spot based on the Spot's id - DONE
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const user = req.user;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });
    return res.json({
      Booking: bookings,
    });
  }

  if (spot.ownerId === user.id) {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    return res.json({
      Bookings: bookings,
    });
  }
});

//Create a Booking from a Spot based on the Spot's id - DONE
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const user = req.user;
  let { startDate, endDate } = req.body;
  let currentDate = Date.now();
  const spot = await Spot.findByPk(req.params.spotId);

  //Non-existent Spot error -GOOD TO GO
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  //If Owner owns the spot - GOOD TO GO
  if (spot.ownerId === user.id) {
    res.status(403);
    return res.json({
      message: "Owner cannot book its own spot",
    });
  }

  let errors = {
    endDate: "endDate cannot be on or before startDate",
  };

  //If end date is before start date - GOOD TO GO
  if (endDate <= startDate) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: errors,
    });
  }

  //you can't add a date in the passed
  if (
    Date.parse(startDate) < currentDate ||
    Date.parse(endDate) < currentDate
  ) {
    res.status(400);
    return res.json({
      message: "Cannot create a booking to a date in the past!",
    });
  }

  const bookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
  });

  let bookingErrors = {};

  for (let booking of bookings) {
    if (
      (booking.startDate <= startDate && booking.endDate >= startDate) ||
      (booking.startDate <= endDate && booking.endDate >= endDate)
    ) {
      bookingErrors.startDate = "Start date conflicts with an existing booking";
      bookingErrors.endDate = "End date conflicts with an existing booking";
      break;
    }
    if (booking.startDate >= startDate && booking.endDate <= endDate) {
      bookingErrors.exist = "A booking exists between your start and end date";
      break;
    }
  }

  if (Object.keys(bookingErrors).length) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: bookingErrors,
    });
  }

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: user.id,
    startDate,
    endDate,
  });

  return res.json(newBooking);
});

module.exports = router;
