import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import OpenModalButton from "../../components/OpenModalButton";
import ReviewModalButton from "./ReviewModalButton";
import './SpotReviews.css'
import leaf from "../../assets/mapleleaf.png";

const SpotReviews = ({ spotId, spotRating, numReviews, spot }) => {
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews.spot);
  const reviews = Object.values(reviewObj);
  const sessionUser = useSelector((state) => state.session.user);

  console.log(spot.ownerId)
  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [dispatch]);

  // if(!sessionUser) return null;

  return (
      <div className="reviews-container">
      <h2>
        <img src={leaf} className="leaf" alt="maple" /> {spotRating} • {numReviews} Reviews
      </h2>

      {/* !(reviews.find(review => review.userId === sessionUser.id)) && */}

    {/* {
    (sessionUser.id !== spot.ownerId) &&  (<OpenModalButton
                  className="review-modal-button"
                  buttonText="Post A Review"
                  modalComponent={<ReviewModalButton spotId={spotId} />}
    />)

    } */}
    
      {reviews.map((review) => (
        <>
          <div className="review-box">
            <h4>
              {review.User?.firstName} {review.User?.lastName}
            </h4>
            <p>{review.createdAt}</p>
            <div className="review-details">
              <p>{review.review}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  )
};

export default SpotReviews;
