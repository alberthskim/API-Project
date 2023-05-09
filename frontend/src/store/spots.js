import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOTS'
const CREATE_A_SPOT = "spots/CREATE_A_SPOT"

//ACTIONS FOR SPOTS
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

export const loadSingleSpot = spot => {
    return {
        type: LOAD_SINGLE_SPOT,
        spot
    }
}

export const makeASpot = spot => {
  return {
    type: CREATE_A_SPOT,
    spot
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
        // console.log("after grabbing from db", spot)
        dispatch(loadSingleSpot(spot))
        return spot;
    }
}

export const createASpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
    });

    if(response.ok) {
      const newSpot = await response.json();
      dispatch(makeASpot(newSpot))
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
    case LOAD_SINGLE_SPOT: {
      const newState = {...state, singleSpot: {...state.singleSpot}};
      const oneSpot = {...action.spot, SpotImages: [state.singleSpot.SpotImages]};
      action.spot.SpotImages.forEach((img, index) => {
        oneSpot.SpotImages[index] = img;
      })
      newState.singleSpot = oneSpot
      return newState;
    }
    case CREATE_A_SPOT: {
      let newSpot = {...action.spot};
      console.log("This is inside create a spot", newSpot)
      let newState = {...state, newSpot}
      newState.allSpots[action.spot.id] = {...action.spot};
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default spotReducer;
