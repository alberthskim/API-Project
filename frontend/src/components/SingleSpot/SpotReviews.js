import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import OpenModalButton from "../../components/OpenModalButton";
import ReviewModalButton from "./ReviewModalButton";
import DeleteReviewButton from "./DeleteReviewButton";
import "./SpotReviews.css";
import leaf from "../../assets/mapleleaf.png";
import { getSingleSpot } from "../../store/spots";


const SpotReviews = ({ spotId, spotRating, numReviews, spot }) => {
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews.spot);
  const reviews = Object.values(reviewObj);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllReviews(spotId));
    dispatch(getSingleSpot(spotId));

  }, [dispatch, spotId]);


  return (
    <div className="reviews-container">
      <h2>
        <img src={leaf} className="leaf" alt="maple" />{" "}
        {spotRating === "NaN" ? "New" : Number(spotRating).toFixed(1)} • {numReviews} Reviews
      </h2>

      {sessionUser && sessionUser?.id !== spot.ownerId &&
        !(reviews.find(review => review.userId === sessionUser?.id)) && (
          <OpenModalButton
            className="review-modal-button"
            buttonText="Post A Review"
            modalComponent={<ReviewModalButton spotId={spotId} />}
          />
        )}

      {reviews.map((review) => (
        <>
          <div className="review-box">
            <h4>
              {review.User?.firstName} {review.User?.lastName}
            </h4>
            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
            <div className="review-details">
              <p>{review.review}</p>
            </div>

            {sessionUser && review.userId === sessionUser?.id && (<OpenModalButton
              className="review-modal-button"
              buttonText="Delete A Review"
              modalComponent={<DeleteReviewButton reviewId={review.id} spotId={spotId}/>}
            />)}
          </div>
        </>
      ))}
    </div>
  );
};

export default SpotReviews;
