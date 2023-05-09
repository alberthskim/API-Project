import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import "./UserSpots.css";

const UserSpots = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj.allSpots);

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
                  <div className="review">
                    ⭐️ {spot.avgRating ? spot.avgRating : "New"}
                  </div>
                </div>
                <div className="city-state">
                  {spot.city}, {spot.state}
                </div>
                <div className="country">{spot.country}</div>
                <div className="price">${spot.price} night</div>
              </Link>
              <div className="button">
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default UserSpots;
