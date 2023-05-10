import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../store/reviews";



const SpotReviews = ({spotId}) => {
    const dispatch = useDispatch()
    const review = useSelector(state => state.reviews)
    console.log("THIS IS THE REVIEWS", review);

    useEffect(() => {
        dispatch(getAllReviews(spotId))
    }, [dispatch])

    return (
        <div className="reviews-container">
                {/* <h3>⭐️ {spot.avgStarRating} • {spot.numReviews} Reviews</h3> */}
                <h1>HI FROM SPOTREVIEWS.JS</h1>
                <div className="review-details">
                    <h3>Review's Name</h3>
                    <h3>Review Date Created</h3>
                    <h3>Review Details</h3>
                </div>
        </div>
    )
}

export default SpotReviews;
