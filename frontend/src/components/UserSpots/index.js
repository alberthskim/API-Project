import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../../components/OpenModalButton";
import DeleteButton from "./DeleteButton.js";
import leaf from "../../assets/mapleleaf.png";
import "./UserSpots.css";

const UserSpots = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
      alert("Please Log In First");
    }
  }, []);

  return (
    <>
      <div className="manage-header">
        <h1>Manage Your Spots</h1>
        <button className="newSpot">
          <Link to={"/spots/new"} className="newspot-link">
            Create A New Spot
          </Link>
        </button>
      </div>
      <div className="spot-container">
        {spots.map((spot) => (
          <>
            <div className="spots">
              <Link to={`/spots/${spot.id}`} className="spot-details">
                <div className="spotimg">
                  <img id="spot-img" src={`${spot.previewImage}`} alt="" />
                </div>
                <div className="spot-details">
                  {/* <div className="name">{spot.name}</div> */}
                  <div className="city-state-review">
                    {spot.city}, {spot.state}
                    <div className="ratings">
                    <img src={leaf} className="leaf"/>
                      {spot.avgRating ? Number(spot.avgRating).toFixed(1) : "New"}
                    </div>
                  </div>
                </div>
                <div className="country">{spot.country}</div>
                <div className="price">${spot.price} night</div>
              </Link>
              <div className="buttons">
                <Link to={`/spots/${spot.id}/edit`} className="spot-details">
                  <button className="user-spot-buttons update-button">Update</button>
                </Link>
                <OpenModalButton
                  className="user-spot-buttons"
                  buttonText="Delete"
                  modalComponent={<DeleteButton spotId={spot.id} />}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default UserSpots;
