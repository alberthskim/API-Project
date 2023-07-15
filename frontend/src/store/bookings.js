import { csrfFetch } from "./csrf";

const GET_ALL_USER_BOOKING = 'booking/GET_ALL_USER_BOOKING'
const GET_ALL_SPOT_BOOKING = 'booking/GET_ALL_SPOT_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'

export const getAllUserBooking = bookings => ({
    type: GET_ALL_USER_BOOKING,
    bookings
})

export const getAllSpotBooking = bookings => ({
    type: GET_ALL_SPOT_BOOKING,
    bookings
})

export const createABooking = booking => ({
    type: CREATE_BOOKING,
    booking
})

export const deleteABooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
})

export const getAllUserBookingThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(getAllUserBooking(bookings))
        return bookings
    }
}

export const getAllSpotBookingThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(getAllSpotBooking(bookings))
        return bookings
    }
}


export const createABookingThunk = (spotId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const booking = await response.json()
        dispatch(createABooking(booking))
        return booking
    } else {
        const error = await response.json()
        return error
    }
}

export const deleteABookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteABooking(bookingId));
        return deleted;
    }
}

const initialState = {user: {}, spot: {}}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_BOOKING: {
            const newState = {...state, user: {...state.user}, spot: {...state.spot}}
            action.bookings.Bookings.forEach(booking => newState.user[booking.id] = booking)
            return newState
        }
        case GET_ALL_SPOT_BOOKING: {
            const newState = {...state, user: {...state.user}, spot: {...state.spot}}
            console.log("This is the payload = action.bookings", action.bookings)
            action.bookings.Bookings.forEach(booking => newState.spot[booking.id] = booking)
            return newState
        }
        case CREATE_BOOKING: {
            const newState = { ...state, spot: {...state.spot}, user: {...state.user}}
            newState.spot[action.booking.id] = action.booking
            return newState
        }
        case DELETE_BOOKING: {
            const newState = {...state, user: {...state.user}, spot: {...state.spot}};
            delete newState.user[action.bookingId]
            delete newState.spot[action.bookingId]
            return newState;
        }
        default:
            return state;
    }
}

export default bookingReducer;
