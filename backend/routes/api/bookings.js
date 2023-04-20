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




//Edit a Booking - NOT DONE
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

    //If end date comes before startDate - Good TO GO
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

    if ((startDate < currentDate) || (endDate < currentDate)) {
        res.status(403);
        return res.json({
            message: "Cannot edit booking to a date in the past!"
        })
    }

    if (Date.parse(booking.endDate) < currentDate) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified"
        })
    }

    const spot = await Spot.findByPk(booking.spotId)
    console.log("This is spot", spot);

    // const allBookings
    // let bookingErrors = {}

    // for(let booking of bookings) {
    //     if ((booking.startDate <= startDate) && (booking.endDate >= startDate) || (booking.startDate <= endDate) && (booking.endDate >= endDate)) {
    //         bookingErrors.startDate = "Start date conflicts with an existing booking"
    //         bookingErrors.endDate = "End date conflicts with an existing booking"
    //         break;
    //     }
    //     if ((booking.startDate >= startDate) && (booking.endDate <= endDate)) {
    //         bookingErrors.exist = "A booking exists between your start and end date"
    //         break;
    //     }
    // }

    // if(Object.keys(bookingErrors).length) {
    //     res.status(403);
    //     return res.json({
    //         message: "Sorry, this spot is already booked for the specified dates",
    //         errors: bookingErrors
    //     })
    // }



    booking.startDate = startDate
    booking.endDate = endDate

    await booking.save()

    return res.json(booking);
})


//Delete a Booking - DONE except Spot must belong to the current user to be able to delete
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const user = req.user
    const booking = await Booking.findByPk(req.params.bookingId)


    if(!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        })
    }


    if(booking.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Booking must belong to current user"
        })
    }

    if(Date.parse(booking.startDate) < Date.now()) {
        res.status(403);
        return res.json({
            message: "Bookings that have started or passed can't be deleted!"
        })
    }

    // const spot = await Spot.findByPk(booking.spotId)
    // console.log(spot);

    // checks if spot belongs to current user
    // if(spot.spotId === user.id) {
    //     return res.json({
    //         message: "Spot must belong to the current user"
    //     })
    // }

    booking.destroy()

    return res.json({
        message: "successfully deleted"
    });
})


module.exports = router;
