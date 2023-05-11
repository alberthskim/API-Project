import { useState} from "react";
import { useModal } from "../../context/Modal";
import { addAReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './ReviewModalButton.css'


const ReviewModalButton = ({spotId}) => {
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [activeRating, setActiveRating] = useState(1)
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleReview = async (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars: Number(stars)
        }


        await dispatch(addAReview(newReview, spotId))
        history.push(`/spots/${spotId}`)
        window.location.reload(false)
        closeModal();
    }

    return (
        <>
            <form onSubmit={handleReview}>
                <div className="review-modal">
                    <h2>How was your stay?</h2>
                    <textarea
                        className="review-text"
                        placeholder="Write a review..."
                        value={review}
                        onChange={e=> setReview(e.target.value)}
                        rows={10}
                        cols={40}
                    />

                    <div className="star-ratings">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(1)}
                        onClick={() => setStars(1)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(2)}
                        onClick={() => setStars(2)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(3)}
                        onClick={() => setStars(3)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(4)}
                        onClick={() => setStars(4)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(5)}
                        onClick={() => setStars(5)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    </div>
                    <button type="submit" className="submit-review-button">
                        Submit Review
                    </button>
                </div>
            </form>
        </>
    )
}


export default ReviewModalButton;
