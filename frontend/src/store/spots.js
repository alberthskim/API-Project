import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOTS'

//ACTIONS FOR SPOTS
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const loadSingleSpot = spots => {
    return {
        type: LOAD_SINGLE_SPOT,
        spots
    }
}

//THUNKS FOR SPOTS
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    let spots = await response.json();
    // console.log("After fetching data", spots);
    spots = spots.Spots;
    dispatch(loadSpots(spots));
    return spots;
  }
};

export const getSingleSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);

    if(response.ok) {
        let spot = await response.json();
        console.log("after grabbing from db", spot)
        dispatch(loadSingleSpot(spot))
        return spot;
    }
}

//SPOT REDUCER
const initialState = { allSpots: {}, singleSpot: { SpotImages: []} };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spots = {};
      action.spots.forEach((spot) => (spots[spot.id] = spot));
      return { allSpots: {...spots}, singleSpot: {...state.singleSpot} };
    }
    default: {
      return state;
    }
  }
};

export default spotReducer;
