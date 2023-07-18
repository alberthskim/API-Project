import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteABookingThunk } from "../../store/bookings";


const DeleteReservationButton = ({ bookingInfo }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deletehandler = async () => {
    dispatch(deleteABookingThunk(bookingInfo.id))
    closeModal();
  };

  const doNotDeletehandler = () => {
    closeModal();
  };

  return (
    <div className="delete-review">
      <h2 className="confirm-delete">Confirm Cancellation</h2>
      <p>Are you sure you want to cancel the reservation?</p>
      <div className="delete-button-container">
        <button onClick={deletehandler} className="delete-button">
          Yes (Cancel Reservation)
        </button>
        <button onClick={doNotDeletehandler} className="delete-button">
          No (Keep Reservation)
        </button>
      </div>
    </div>
  );
};

export default DeleteReservationButton;
