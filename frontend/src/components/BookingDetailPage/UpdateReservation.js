// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { useEffect, useState } from "react";
// import { getAllSpotBookingThunk, getAllUserBookingThunk } from "../../store/bookings";

// const UpdateReservationButton = ({ bookingInfo}) => {
//   const dispatch = useDispatch();
//   console.log("THIS IS THE BOOKING INFO", bookingInfo)
//   const spotBookings = Object.values(useSelector(state => state.bookings.spot));
//   console.log("This is the spotBookings", spotBookings)
//   const user = useSelector(state => state.session.user)
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [submitted, setSubmitted] = useState(false)
//   const [validationErrors, setValidationErrors] = useState({});
//   const { closeModal } = useModal();

//   useEffect(() => {
//     dispatch(getAllSpotBookingThunk(bookingInfo.spotId))
//     dispatch(getAllUserBookingThunk(user.id))
//   }, [dispatch])

//   useEffect(() => {
//     let errors = {};
//     const todaysDate = new Date()
//     const format = {year: 'numeric', month: '2-digit', day: '2-digit'}
//     const formattedDate = todaysDate.toLocaleDateString(undefined, format)
//     const formatForCreation = sortFormatFunction(formattedDate.split('/').reverse())

//     if (!startDate || !endDate) errors.need = "Must Input A Start And End Date."
//     if (startDate > endDate) errors.deny = "End Date Cannot Be Before Start Date."
//     if (startDate === endDate) errors.same = "Start Date and End Date Can't Be The Same."
//     if ((startDate && startDate < formatForCreation) || (endDate && endDate < formatForCreation)) errors.date = "Cannot Create Reservation In The Past."
//     if (startDate === formatForCreation) errors.today = "Cannot Book Last Minute!"

//     for (let i = 0; i < spotBookings.length; i++) {
//         let current = spotBookings[i]
//         if (((current.startDate).toString().slice(0, 10) <= startDate) && (startDate <= (current.endDate).toString().slice(0, 10))) errors.existsOnStart = "Booking already exists between those start dates."
//         if (((current.startDate).toString().slice(0, 10) <= endDate) && (endDate <= (current.endDate).toString().slice(0, 10))) errors.existsOnEnd = "Booking already exists between those end dates."
//     }

//     setValidationErrors(errors);
// }, [startDate, endDate])

// const filterByOthers = (bookings) => {
//     return bookings.filter(booking => console.log("This is filter", booking))
// }

// console.log("THIS IS RESULT", filterByOthers(spotBookings))

// const sortFormatFunction = (formatArr) => {
//     const month = formatArr[1];
//     formatArr[1] = formatArr[2];
//     formatArr[2] = month;

//     return formatArr.join('-');
// }


//   const updatehandler = async (e) => {
//     e.preventDefault()

//     setSubmitted(true)

//     console.log(validationErrors)

//     if (!Object.values(validationErrors).length) {
//         const updateBooking = {
//             startDate,
//             endDate
//         }

//         alert("Updated Booking!")
//     }
//     closeModal();
//   };

//   const doNotCancelhandler = () => {
//     closeModal();
//   };

//   return (
//     <div className="delete-review">
//       <h2 className="confirm-delete">Update Reservation</h2>
//         {validationErrors.need && submitted && (
//             <p className="errors">{validationErrors.need}</p>
//         )}
//         {validationErrors.date && submitted && (
//             <p className="errors">{validationErrors.date}</p>
//         )}
//         {validationErrors.existsOnStart && submitted && (
//             <p className="errors">{validationErrors.existsOnStart}</p>
//         )}
//         {validationErrors.existsOnEnd && submitted && (
//             <p className="errors">{validationErrors.existsOnEnd}</p>
//         )}
//         {validationErrors.today && submitted && (
//             <p className="errors">{validationErrors.today}</p>
//         )}
//         {validationErrors.deny && submitted && (
//             <p className="errors">{validationErrors.deny}</p>
//         )}
//         {validationErrors.same && submitted && (
//             <p className="errors">{validationErrors.same}</p>
//         )}
//         <form>
//             <div className="check-in-out">
//                 <label>Check-In:
//                     <input className="date-input" type="date" dateFormat="yyyy/MM/dd" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 </label>
//                 <label>Check-Out:
//                     <input className="date-input" type="date" dateFormat="yyyy/MM/dd" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
//                 </label>
//             </div>
//             <div className="delete-button-container">
//                 <button onClick={updatehandler} className="delete-button">
//                     Update Reservation
//                 </button>
//                 <button onClick={doNotCancelhandler} className="delete-button">
//                     Keep Current Reservation
//                 </button>
//             </div>
//         </form>
//       </div>
//   );
// };

// export default UpdateReservationButton;
