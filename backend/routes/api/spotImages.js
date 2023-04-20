const express = require('express')
const router = express.Router();
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');


//Delete a spot image - DONE
router.delete('/:imageId', requireAuth, async (req, res) => {
    const user = req.user
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot
        }
    })

    if(!spotImage) {
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }


    if(spotImage.Spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "Spot must belong to the current user"
        })
    }

    spotImage.destroy()
    return res.json({
        message: "Sucessfully deleted"
    })
})


module.exports = router;
