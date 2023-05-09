import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot, getAllSpots } from "../../store/spots";
import './SingleSpot.css'




const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getAllSpots()).then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    const handleReserve = () => {
        alert("Feature Coming Soon")
    };


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
                    {spot.SpotImages.map(img => img ? <img src={img.url} alt="pics"></img> : null)}
                </div>
                <div className="spot-detail">
                    <div className="description">
                        <h3>Entire Spot Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                        <p>{spot.description}</p>
                    </div>
                    <div className="booking">
                        <div className="price-review">
                        <span className="price">${spot.price} night</span>
                        <span className="reviews">⭐️ {spot.avgStarRating} • {spot.numReviews} Reviews</span>

                        </div>
                        <button onClick={handleReserve} className="reserve">Reserve</button>
                    </div>
                </div>
                <div className="reviews-container">
                    <h3>⭐️ {spot.avgStarRating} • {spot.numReviews} Reviews</h3>
                    <div className="review-details">
                        <h3>Review's Name</h3>
                        <h3>Review Date Created</h3>
                        <h3>Review Details</h3>
                    </div>
                </div>
                </>
            }
        </div>
    )
}


export default SingleSpot;
