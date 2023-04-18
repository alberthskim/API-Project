const express = require('express')
const router = express.Router();
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');


//get all spots owned by the Current User
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

//get details of a spot from an id
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

//get all spots
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

//create a spot
router.post('/', requireAuth, async (req, res) => {
})

//Add an image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
})

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
})

//Get all Reviews By a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
})

module.exports = router;
