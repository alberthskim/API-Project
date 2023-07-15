import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteABookingThunk, getAllUserBookingThunk } from "../../store/bookings";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";




function BookingDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userBooking = useSelector(state => state.bookings.user);
    const todaysDate = new Date()
    const format = {year: 'numeric', month: '2-digit', day: '2-digit'}
    const formattedDate = todaysDate.toLocaleDateString(undefined, format)

    const sortFormatFunction = (formatArr) => {
      const month = formatArr[1];
      formatArr[1] = formatArr[2];
      formatArr[2] = month;

      return formatArr.join('-');
  }

    const formatForCreation = sortFormatFunction(formattedDate.split('/').reverse())



    const findFutureBookings = Object.values(userBooking).filter(bookings => formatForCreation < bookings.startDate.slice(0,10))

    useEffect(() => {
        dispatch(getAllUserBookingThunk())
    }, [dispatch])

    if(!sessionUser) history.push('/login')

  return (
    <div className="Upcoming-Container">
          <div className="manage-header">
            <h1 className="manage">Your Trips</h1>
          </div>

          <div className="spot-container" style={{ display: "flex", flexDirection: "column" }}>
              <h3>Upcoming Trips</h3>
              {findFutureBookings[0] ? (
                <>
                  {findFutureBookings.map((bookingInfo) => (
                  <div className="spots" key={bookingInfo.id}>
                      <Link to={`/spots/${bookingInfo.SpotId}`} className="spot-details">
                          <div className="spotimg">
                              <img id="spot-img" src={bookingInfo.Spot.previewImage} alt="" />
                          </div>
                          <div className="spot-details">
                              <div className="name">{bookingInfo.Spot.name}</div>
                              <div className="city-state-review">
                                  {bookingInfo.Spot.address}, {bookingInfo.Spot.city}, {bookingInfo.Spot.state}
                              </div>
                          </div>
                          <div className="country">{bookingInfo.Spot.country}</div>
                          <div>Check In: {bookingInfo.startDate.slice(0, 10)}</div>
                          <div>Check Out: {bookingInfo.endDate.slice(0, 10)}</div>
                      </Link>
                      <button onClick={() => dispatch(deleteABookingThunk(bookingInfo.id))}>Delete Booking</button>
                  </div>
                  ))}
                </>
              ) : (
                <button onClick={() => history.push("/")}>Start Booking Now</button>
              )}
            </div>


      <div className="spot-container" style={{display: "flex", flexDirection:"column"}}>
          <h3>Previous Trips</h3>
            {userBooking ? (
                <>
                  {Object.values(userBooking).map((bookingInfo) =>
                      formatForCreation > bookingInfo.startDate && (
                          <div className="spots" key={bookingInfo.id} style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr"}}>
                              <Link to={`/spots/${bookingInfo.Spot.id}`} className="spot-details">
                                  <div className="spotimg">
                                      <img id="spot-img" src={bookingInfo.Spot.previewImage} alt="" />
                                  </div>
                                  <div className="spot-details">
                                      <div className="name">{bookingInfo.Spot.name}</div>
                                      <div className="city-state-review">
                                          {bookingInfo.Spot.address}, {bookingInfo.Spot.city}, {bookingInfo.Spot.state}
                                      </div>
                                  </div>
                                  <div className="country">{bookingInfo.Spot.country}</div>
                                  <div>Checked In: {bookingInfo.startDate.slice(0, 10)}</div>
                                  <div>Checked Out: {bookingInfo.endDate.slice(0, 10)}</div>
                              </Link>
                          </div>
                      )
                  )}
                </>
            ) : (
              <p>No Previous Bookings</p>
            )}
        </div>


    </div>
    );
}

export default BookingDetailPage;
