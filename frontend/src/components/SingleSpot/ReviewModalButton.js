import { useState } from "react";
import { useModal } from "../../context/Modal";
import { addAReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import "./ReviewModalButton.css";
import leaf from "../../assets/mapleleaf.png";
import { getSingleSpot } from "../../store/spots";

const ReviewModalButton = ({ spotId }) => {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [activeRating, setActiveRating] = useState(1);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleReview = async (e) => {
    e.preventDefault();
    const newReview = {
      review,
      stars: Number(stars),
    };

    await dispatch(addAReview(newReview, spotId));
    await dispatch(getSingleSpot(spotId)) //re-renders the whole single spot to get every info and changes whats needed.
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleReview}>
        <div className="review-modal">
          <h2>How Was Your Stay?</h2>
          <textarea
            className="review-text"
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={10}
            cols={40}
          />

          <div className="stars-for-rating">
            <div
              className={activeRating >= 1 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(1)}
              onClick={() => setStars(1)}
            >
              {/* <img src={leaf} className="mapleleaf" alt="leaf" /> */}
              <i className="fa-solid fa-star medium-big-star clickable"></i>
            </div>
            <div
              className={activeRating >= 2 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(2)}
              onClick={() => setStars(2)}
            >
              {/* <i class="fa-light fa-leaf-maple"></i> */}
              <i className="fa-solid fa-star medium-big-star clickable"></i>
              {/* <img src={leaf} className="mapleleaf" alt="leaf" /> */}
            </div>
            <div
              className={activeRating >= 3 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(3)}
              onClick={() => setStars(3)}
            >
              {/* <i class="fa-light fa-leaf-maple"></i> */}
              <i className="fa-solid fa-star medium-big-star clickable"></i>
            </div>
            <div
              className={activeRating >= 4 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(4)}
              onClick={() => setStars(4)}
            >
              {/* <i class="fa-light fa-leaf-maple"></i> */}
              <i className="fa-solid fa-star medium-big-star clickable"></i>
            </div>
            <div
              className={activeRating >= 5 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(5)}
              onClick={() => setStars(5)}
            >
              {/* <i class="fa-light fa-leaf-maple"></i> */}
              <i className="fa-solid fa-star medium-big-star clickable"></i>
            </div>
            <div className="star-div">Stars</div>
          </div>
          <button type="submit" className="submit-review-button" disabled={review.length <10 || !stars} onClick={handleReview}>
            Submit Your Review
          </button>
        </div>
      </form>
    </>
  );
};

export default ReviewModalButton;
