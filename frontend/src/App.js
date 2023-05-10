import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SingleSpot from "./components/SingleSpot";
import SpotForm from "./components/SpotForm";
import UserSpots from "./components/UserSpots";
import UpdateSpotForm from "./components/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route exact path="/spots/new">
            <SpotForm />
          </Route>
          <Route path="/spots/:spotId/edit">
            <UpdateSpotForm />
          </Route>
          <Route exact path="/current">
            <UserSpots />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
          <Route>
            <h2>Page Could Not Be Found!</h2>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
