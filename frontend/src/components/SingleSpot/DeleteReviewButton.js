import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteAReview } from "../../store/reviews";


const DeleteReviewButton = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();


    const deletehandler = async () => {
        await dispatch(deleteAReview(reviewId))
        history.push(`/spots/${spotId}`)
        closeModal()
        window.location.reload(false)
    }

    const doNotDeletehandler = () => {
        closeModal()
    }

    return (
        <div className="delete-review">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="delete-button-container">
                <button onClick={deletehandler} className="delete-button">Yes (Delete Review)</button>
                <button onClick={doNotDeletehandler} className="delete-button">No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewButton;
