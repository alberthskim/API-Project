import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import './SingleSpot.css'




const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)


    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch, spotId])

    const handleReserve = () => {
        alert("Feature Coming Soon")
    };

    let spot;
    if(spots) spot = spots.allSpots[spotId]
    // console.log("This is the spot", spot);

    if(!spot) return null;

    return (
        <div className="single-spot-container">
            {spot?.id &&
                <>
                <div className="single-spot-detail">
                    <h1>{spot.name}</h1>
                    <h2>{spot.city}, {spot.state}, {spot.country}</h2>
                </div>
                <div className="single-spot-images">
                    {spots.singleSpot.SpotImages.map(img => <img src={img.url} alt="pics"></img>)}
                </div>
                <div className="spot-detail">
                    <div className="description">
                        <h3>Entire Spot Hosted By {spots.singleSpot.Owner.firstName} {spots.singleSpot.Owner.lastName}</h3>
                        <p>{spot.description}</p>
                    </div>
                    <div className="booking">
                        <div className="price-review">
                        <span className="price">${spot.price} night</span>
                        <span className="reviews">⭐️ {spots.singleSpot.avgStarRating} • {spots.singleSpot.numReviews} Reviews</span>

                        </div>
                        <button onClick={handleReserve} className="reserve">Reserve</button>
                    </div>
                </div>
                <div className="reviews-container">
                    <h3>⭐️ {spots.singleSpot.avgStarRating} • {spots.singleSpot.numReviews} Reviews</h3>
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
