const express = require('express')
const router = express.Router();
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');


//Get all Reviews of the current User - DONE
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [{
                    model: SpotImage,
                    where: {
                        preview: true
                    },
                    attributes: ['url']
                }]

            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })


    const allReviews = [];
    reviews.forEach(review => {
        allReviews.push(review.toJSON())
    })


    for(let review in allReviews) {
        let current = allReviews[review];

        let url = current.Spot.SpotImages[0]

        if(url) {
            current.Spot.previewImage = url.url
        } else {
            current.Spot.previewImage = 'No Preview Available'
        }

        delete current.Spot.SpotImages
    }


    res.json({Reviews: allReviews})
})




//Add an image to a review based on the review's id - DONE
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    let { url } = req.body;
    const user = req.user
    const review = await Review.findByPk(req.params.reviewId)

    if(!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if(review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Review must belong to the current user"
        })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if(reviewImages.length >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    const addImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    });

    return res.json({
        id: addImage.id,
        url
    })


});



//edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const user = req.user
    let { review, stars } = req.body

    const currentReview = await Review.findByPk(req.params.reviewId)

    if(!currentReview) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if(currentReview.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Review must belong to the current user"
        })
    }

    let errors = {}

    if(!review) {
        errors.review = "Review text is required"
    }
    if(!stars || stars < 0 || stars > 5 || typeof stars !== "number") {
        errors.stars = "Stars must be an integer from 1 to 5"
    }

    if(Object.keys(errors).length) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
    }

    currentReview.review = review;
    currentReview.stars = stars

    await currentReview.save()

    res.json(currentReview);
})


//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const user = req.user
    const review = await Review.findByPk(req.params.reviewId)

    if(!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if(review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Review must belong to the current user"
        })
    }

    review.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})



module.exports = router;
