import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="spot-container">
      {spots.map((spot) => (
        <NavLink to={`/spots/${spot.id}`} className="spot-details">
          <div className="spots">
            <div className="spotimg">
              {spot.previewImage ? (
                <img id="spot-img" src={`${spot.previewImage}`} alt="" />
              ) : (
                <p>Image Not Available</p>
              )}
            </div>
            <div className="spot-details">
              {/* <div className="name">{spot.name}</div> */}
              <div className="review">
                ⭐️ {spot.avgRating ? spot.avgRating : "New"}
              </div>
            </div>
            <div className="city-state">
              {spot.city}, {spot.state}
            </div>
            <div className="country">{spot.country}</div>
            <div className="price">${spot.price} night</div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Spots;
