import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleSpot, getAllSpots, dataReset } from "../../store/spots";
import './SingleSpot.css'
import leaf from "../../assets/mapleleaf.png";
import SpotReviews from "./SpotReviews";
import {createABookingThunk, getAllSpotBookingThunk} from "../../store/bookings"




const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)
    const spotBookings = Object.values(useSelector(state => state.bookings.spot));
    const sessionUser = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getAllSpotBookingThunk(spotId))
        dispatch(getAllSpots()).then(() => setIsLoaded(true))
        return () => dispatch(dataReset())
    }, [dispatch])


    useEffect(() => {
        let errors = {};
        const todaysDate = new Date()
        const format = {year: 'numeric', month: '2-digit', day: '2-digit'}
        const formattedDate = todaysDate.toLocaleDateString(undefined, format)
        const formatForCreation = sortFormatFunction(formattedDate.split('/').reverse())

        if (!startDate || !endDate) errors.need = "Must Input A Start And End Date."
        if (startDate > endDate) errors.deny = "End Date Cannot Be Before Start Date."
        if (startDate === endDate) errors.same = "Start Date and End Date Can't Be The Same."
        if ((startDate && startDate < formatForCreation) || (endDate && endDate < formatForCreation)) errors.date = "Cannot Create Reservation In The Past."
        if (startDate === formatForCreation) errors.today = "Cannot Book Last Minute!"

        for (let i = 0; i < spotBookings.length; i++) {
            let current = spotBookings[i]
            if (((current.startDate).toString().slice(0, 10) <= startDate) && (startDate <= (current.endDate).toString().slice(0, 10))) errors.existsOnStart = "Booking already exists between those start dates."
            if (((current.startDate).toString().slice(0, 10) <= endDate) && (endDate <= (current.endDate).toString().slice(0, 10))) errors.existsOnEnd = "Booking already exists between those end dates."
        }

        setValidationErrors(errors);
    }, [startDate, endDate])

    const sortFormatFunction = (formatArr) => {
        const month = formatArr[1];
        formatArr[1] = formatArr[2];
        formatArr[2] = month;

        return formatArr.join('-');
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        console.log(validationErrors)

        if (!Object.values(validationErrors).length) {
            const newBooking = {
                startDate,
                endDate
            }

            dispatch(createABookingThunk(spotId, newBooking))
            dispatch(getAllSpotBookingThunk(spotId))
            alert("Spot has been Booked!")
            history.push(`/user/${sessionUser.id}/bookings`)
        }
    }


    if(!spot) return null;

    return isLoaded && (
        <div className="single-spot-container">
            {spot?.id &&
                <>
                <div className="single-spot-detail">
                    <h1>{spot.name}</h1>
                    <h2>{spot.city}, {spot.state}, {spot.country}</h2>
                </div>
                <div className="single-spot-images">
                    {spot.SpotImages?.map((img, i) => img ? <img src={img.url} className={`images i${i}`} alt="pics"></img> : null)}
                </div>
                <div className="spot-detail">
                    <div className="description">
                        <h3>Entire Spot Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                        <p>{spot.description}</p>
                    </div>
                    <div className="booking">
                        <div className="price-review">
                        <span className="price">${spot.price} night</span>
                        <span className="reviews"><img src={leaf} className="leaf"/> {spot.avgStarRating !== "NaN" ? Number(spot.avgStarRating).toFixed(1) : "New"} {spot.numReviews === 0 ? null : (spot.numReviews <= 1 ? `• ${spot.numReviews} Review` : `• ${spot.numReviews} Reviews`)}</span>

                        </div>
                            {validationErrors.need && submitted && (
                                <p className="errors">{validationErrors.need}</p>
                            )}
                            {validationErrors.date && submitted && (
                                <p className="errors">{validationErrors.date}</p>
                            )}
                            {validationErrors.existsOnStart && submitted && (
                                <p className="errors">{validationErrors.existsOnStart}</p>
                            )}
                            {validationErrors.existsOnEnd && submitted && (
                                <p className="errors">{validationErrors.existsOnEnd}</p>
                            )}
                            {validationErrors.today && submitted && (
                                <p className="errors">{validationErrors.today}</p>
                            )}
                            {validationErrors.deny && submitted && (
                                <p className="errors">{validationErrors.deny}</p>
                            )}
                            {validationErrors.same && submitted && (
                                <p className="errors">{validationErrors.same}</p>
                            )}
                        {sessionUser.id !== spot.Owner.id ? (
                            <form onSubmit={handleSubmit}>
                                <div className="check-in-out">
                                    <label>Check-In:
                                        <input className="date-input" type="date" dateFormat="yyyy/MM/dd" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                    </label>
                                    <label>Check-Out:
                                        <input className="date-input" type="date" dateFormat="yyyy/MM/dd" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                    </label>
                                </div>
                                <button className="reserve">Reserve</button>
                            </form>
                        ) : (
                            null
                        )}
                    </div>
                </div>
                <div className="reviews-info">
                    <SpotReviews spotId={spotId} spotRating={spot.avgStarRating} numReviews={spot.numReviews} spot={spot} />
                </div>
                </>
            }
        </div>
    )
}


export default SingleSpot;
