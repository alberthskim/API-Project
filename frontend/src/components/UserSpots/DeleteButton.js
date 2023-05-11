import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteASpot } from "../../store/spots";
import './DeleteButton.css'

const DeleteModal = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deletehandler = async () => {
        await dispatch(deleteASpot(spotId))
        history.push('/spots/current')
        closeModal()
    }

    const doNotDeletehandler = async () => {
        closeModal()
    }

    return (
        <div className="delete-spot">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <div className="delete-button-container">
                <button onClick={deletehandler} className="delete-button">Yes (Delete Spot)</button>
                <button onClick={doNotDeletehandler} className="delete-button">No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteModal;
