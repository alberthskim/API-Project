import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/reviews/GET_ALL_REVIEWS';


//ACTIONS FOR REVIEWS

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
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



//Review Reducer
const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer;
