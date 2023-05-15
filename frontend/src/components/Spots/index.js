import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { dataReset, getAllSpots } from "../../store/spots";
import leaf from "../../assets/mapleleaf.png";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
    return () => dispatch(dataReset());
  }, [dispatch]);

  return (
    <div className="spot-container">
      {spots.map((spot) => (
        <Link to={`/spots/${spot.id}`} className="spot-details">
          <div className="spots">
            <div className="spotimg">
              <div className="tooltip">
                {spot.previewImage ? (
                  <img id="spot-img" src={`${spot.previewImage}`} alt="" />
                ) : (
                  <p>Image Not Available</p>
                )}
                <span className="tooltiptext">{spot.name}</span>
              </div>
            </div>

            <div className="spot-details">
              <div className="city-state-review">
                {spot.city}, {spot.state}
                <div className="ratings">
                  <img src={leaf} className="leaf" />
                  {spot.avgRating ? Number(spot.avgRating).toFixed(1) : "New"}
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
