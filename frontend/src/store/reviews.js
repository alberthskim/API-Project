import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/reviews/LOAD_REVIEWS';
const ADD_A_REVIEW = '/reviews/ADD_A_REVIEW';
const DELETE_A_REVIEW = '/reviews/DELETE_A_REVIEW';


//ACTIONS FOR REVIEWS

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const addReview = (review) => {
    return {
        type: ADD_A_REVIEW,
        review
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_A_REVIEW,
        reviewId
    }
}


//THUNK FOR REVIEWS

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews))
        return reviews;
    }
}

export const addAReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    });

    //pass in user to make it more efficient
    if(response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        dispatch(getAllReviews(spotId)); // this loads the spots reviews and gets the username that was missing.
        return newReview;
    }
}

export const deleteAReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })

    if(response.ok) {
        dispatch(deleteReview(reviewId))
    }
}

//Review Reducer
const initialState = {spot: {}, user: {}}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {}
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review;
            })
            return {...state, spot: newState};
        }
        case ADD_A_REVIEW: {
            const newState = {...state, spot: {...state.spot}}
            newState.spot[action.review.id] = action.review
            return newState;
        }
        case DELETE_A_REVIEW: {
            const newState = {...state, spot: {...state.spot}};
            delete newState.spot[action.reviewId]
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer;
