const express = require('express')
const router = express.Router();
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');


//Delete an existing image for a review
router.delete('/:imageId', requireAuth, async (req, res) => {
    const user = req.user
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    })

    if (!reviewImage) {
        res.status(404);
        return res.json({
            message: "Review Image couldn't be found"
        })
    }

    if (reviewImage.Review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Review must belong to the current user"
        })
    }

    reviewImage.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})



module.exports = router;
