const express = require('express')
const router = express.Router();
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');



//Get all of the current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        include: [
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
            }
        ]
    })


    const allBookings = [];
    bookings.forEach(booking => {
        allBookings.push(booking.toJSON())
    })


    for(let booking in allBookings) {
        let current = allBookings[booking];

        let url = current.Spot.SpotImages[0]

        if(url) {
            current.Spot.previewImage = url.url
        } else {
            current.Spot.previewImage = 'No Preview Available'
        }

        delete current.Spot.SpotImages
    }


    res.json({Bookings: allBookings})
})




//Edit a Booking - DONE
router.put('/:bookingId', requireAuth, async (req, res) => {
    const user = req.user;
    let { startDate, endDate } = req.body;
    let currentDate = Date.now()
    console.log(currentDate);
    const booking = await Booking.findByPk(req.params.bookingId)

    //Non-existent Spot error - GOOD TO GO
    if(!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    //If Owner does not match the booking - GOOD TO GO
    if(booking.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Booking must belong to the current user"
        })
    }

    //If end date comes before startDate - CHECK GOOD
    let errors = {
        endDate: 'endDate cannot be on or before startDate'
    }

    if (endDate <= startDate) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
    }

    //CHECK GOOD!
    if ((Date.parse(startDate) < currentDate) || (Date.parse(endDate) < currentDate)) {
        res.status(403);
        return res.json({
            message: "Cannot edit booking to a date to the past!"
        })
    }

    //CHECK GOOD!
    if (Date.parse(booking.endDate) < currentDate) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified"
        })
    }

    const spot = await Spot.findByPk(booking.spotId)
    const allBookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    })
    
    let bookingErrors = {}

    for(let booking of allBookings) {
        if ((booking.startDate <= startDate) && (booking.endDate >= startDate) || (booking.startDate <= endDate) && (booking.endDate >= endDate)) {
            bookingErrors.startDate = "Start date conflicts with an existing booking"
            bookingErrors.endDate = "End date conflicts with an existing booking"
            break;
        }
        if ((booking.startDate >= startDate) && (booking.endDate <= endDate)) {
            bookingErrors.exist = "A booking exists between your start and end date"
            break;
        }
    }

    if(Object.keys(bookingErrors).length) {
        res.status(403);
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: bookingErrors
        })
    }


    booking.startDate = startDate
    booking.endDate = endDate

    await booking.save()

    return res.json(booking);
})


//Delete a Booking - DONE
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const user = req.user
    let current = Date.now()
    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    })

    if(!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    if(Date.parse(booking.startDate) < current) {
        res.status(403);
        return res.json({
            message: "Bookings that have started or passed can't be deleted!"
        })
    }

    if(booking.Spot.ownerId === user.id) {
        booking.destroy()
        return res.json({
            message: "Sucessfully deleted"
        })
    }

    if(booking.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Booking must belong to current user"
        })
    }

    booking.destroy()

    return res.json({
        message: "Successfully deleted"
    });
})


module.exports = router;
