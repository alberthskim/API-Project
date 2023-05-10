import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
        <Link to={`/spots/${spot.id}`} className="spot-details">
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
              <div className="city-state-review">
                {spot.city}, {spot.state}
                <div className="ratings">
                  <i className="fa-brands fa-canadian-maple-leaf"></i>
                  {spot.avgRating ? spot.avgRating : "New"}
                </div>
              </div>
            </div>
            <div className="country">{spot.country}</div>
            <div className="price">${spot.price} night</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Spots;
