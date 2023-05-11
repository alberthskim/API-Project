import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAReview } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";

const DeleteReviewButton = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deletehandler = async () => {
    await dispatch(deleteAReview(reviewId));
    await dispatch(getSingleSpot(spotId)); //re-renders the whole single spot to get the every info and changes whats needed.

    closeModal();
  };

  const doNotDeletehandler = () => {
    closeModal();
  };

  return (
    <div className="delete-review">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-button-container">
        <button onClick={deletehandler} className="delete-button">
          Yes (Delete Review)
        </button>
        <button onClick={doNotDeletehandler} className="delete-button">
          No (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewButton;
