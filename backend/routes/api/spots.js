const express = require('express')
const router = express.Router();
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');


//get all spots owned by the Current User - DONE
router.get('/current', requireAuth, async(req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{
             model: SpotImage
        },
        {
             model: Review
        }],
     });

    const allSpots = [];
    spots.forEach(spot => {
        let total = 0;
        const json = spot.toJSON();
        json.Reviews.forEach(review => {
            total += review.stars;
        })

        const average = total / json.Reviews.length;
        json.avgRating = average;

        json.SpotImages.forEach(image => {
            if(image.preview) {
                json.previewImage = image.url;
            }
            else {
                json.previewImage = 'Image Not Found';
            }
        })

        delete json.Reviews;
        delete json.SpotImages;
        allSpots.push(json)
    })

    res.json({Spots: allSpots});
});

//get details of a spot from an id - DONE
router.get('/:spotId', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }]
    })

    if(!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    let detailSpot = spot.toJSON()

    const reviewsCount = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    const starsSum = await Review.sum('stars', {
        where: {
            spotId: req.params.spotId
        }
    })

    let average = (starsSum / reviewsCount).toFixed(1)
    detailSpot.numReviews = reviewsCount
    detailSpot.avgStarRating = average

    res.json(detailSpot);
})

//get all spots - NOT DONE
router.get('/', async (req, res) => {
    //Do Pagination Today!
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if(!Number.isInteger(page) || page > 10) page = 1;
    if(!Number.isInteger(size) || size > 20) size = 20;

    if(page <= 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                page: "Page must be greater than or equal to 1",
            }
        })
    }
    if(size <= 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                size: "Size must be greater than or equal to 1"
            }
        })
    }

    //Finish rest of errors and you're done!

    let pagination = {}

    if(page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const spots = await Spot.findAll({
       include: [{
            model: SpotImage
       },
       {
            model: Review
       }],
       ...pagination
    });

    const allSpots = [];
    spots.forEach(spot => {
        let total = 0;
        const json = spot.toJSON();
        json.Reviews.forEach(review => {
            total += review.stars;
        })

        const average = total / json.Reviews.length;
        json.avgRating = average;

        json.SpotImages.forEach(image => {
            if(image.preview) {
                json.previewImage = image.url;
            }
            else {
                json.previewImage = 'No Preview Image Available. Come Back Later!';
            }
        })

        delete json.Reviews;
        delete json.SpotImages;
        allSpots.push(json)
    })

    res.json({Spots: allSpots, page, size})
})

//create a spot - DONE
router.post('/', requireAuth, async (req, res) => {
    let { address, city, state, country, lat, lng, name, description, price} = req.body;

    let errors = {}

    if (!address) {
        errors.address = "Street address is required"
    }
    if (!city) {
        errors.city = "City is required"
    }
    if (!state) {
        errors.state = "State is required"
    }
    if (!country) {
        errors.country = "Country is required"
    }
    if (!lat || typeof lat !== "number") {
        errors.lat = "Latitude is not valid"
    }
    if (!lng || typeof lng !== "number") {
        errors.lng = "Longitude is not valid"
    }
    if (!name || name.length > 50) {
        errors.name = "Name must be less than 50 characters"
    }
    if (!description) {
        errors.description = "Description is required"
    }
    if (!price || typeof price !== "number") {
        errors.price = "Price per day is required"
    }

    if (Object.keys(errors).length) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
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
        price
    })


    res.status(201);
    return res.json(newSpot)

})

//Add an image to a Spot based on the Spot's id - DONE
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const user = req.user
    const {url, preview} = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    //check to see if it matches the owner
    if(!spot || spot.ownerId !== user.id) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const addImage = await SpotImage.create({
        url,
        preview
    })

    return res.json({
        id: addImage.id,
        url: addImage.url,
        preview: addImage.preview
    })
})

//Edit a Spot - DONE
router.put('/:spotId', requireAuth, async (req, res) => {
    const user = req.user
    console.log(user.id);
    let { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot || spot.ownerId !== user.id) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    let errors = {}

    if(!address) {
        errors.address = "Street address is required"
    }
    if(!city) {
        errors.city = "City is required"
    }
    if(!state) {
        errors.state = "State is required"
    }
    if(!country) {
        errors.country = "Country is required"
    }
    if(!lat || typeof lat !== "number") {
        errors.lat = "Latitude is not valid"
    }
    if(!lng || typeof lng !== "number") {
        errors.lng = "Longitude is not valid"
    }
    if(!name || name.length > 50) {
        errors.name = "Name must be less than 50 characters"
    }
    if(!description) {
        errors.description = "Description is required"
    }
    if(!price || typeof price !== "number") {
        errors.price = "Price per day is required"
    }

    if(Object.keys(errors).length) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
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

    await spot.save()

    res.json(spot);
})

//Delete a Spot - DONE
router.delete('/:spotId', requireAuth, async (req, res) => {
    const user = req.user
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot || spot.ownerId !== user.id) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    spot.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})

//Get all Reviews By a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
})

module.exports = router;
