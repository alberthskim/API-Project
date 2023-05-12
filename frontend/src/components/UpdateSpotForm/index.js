import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateASpot } from "../../store/spots";
import { getSingleSpot } from "../../store/spots";
// import "./SpotForm.css";

const UpdateSpotForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} = useParams();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(1);
  const [lng, setLng] = useState(1);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleSpot(spotId))
    .then(data => {
      setCountry(data.country)
      setAddress(data.address)
      setCity(data.city)
      setState(data.state)
      setDescription(data.description)
      setName(data.name)
      setPrice(data.price)
    })
  }, [dispatch])


  useEffect(() => {
    const errors = {};
    if (!country || country.length < 5 || country.length > 50)
      errors.country =
        "Country must exist and must be greater than 5 characters and less than 50 characters.";
    if (!address || address.length < 5 || address.length > 255)
      errors.address =
        "Address must exist and must be greater than 5 characters and less than 255 characters.";
    if (!city || city.length < 5 || city.length > 50)
      errors.city =
        "City must exist and must be greater than 5 characters and less than 50 characters.";
    if (!state || state.length < 2 || state.length > 50)
      errors.state =
        "State must exist and must be greater than 2 characters and less than 50 characters.";
    // if(!lat) errors.lat = "Please enter a latitude."
    // if(!lng) errors.lng = "Please enter a longitude."
    if (!description || description.length < 10 || description.length > 500)
      errors.description =
        "Description must exist and must be greater than 10 characters and less than 500 characters.";
    if (!name || name.length < 5 || name.length > 50)
      errors.name =
        "Name must exist and must be greater than 5 characters and less than 50 characters.";
    if (!price || price < 0 || !Number(price))
      errors.price = "Price must have a minimum of $0 a night.";
    // if (!image1) errors.image = "Please provide at least 1 image.";
    setValidationErrors(errors);
  }, [country, address, city, state, description, name, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!Object.values(validationErrors).length) {
    const updatedSpot = {
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price: Number(price),
    };


    const updateSpot = await dispatch(updateASpot(updatedSpot, spotId));
    history.push(`/spots/${updateSpot.id}`);
  }

  };

  useEffect(() => {
    if (!sessionUser) {
      history.push(`/`);
      alert("Must be logged in to create a post!");
    }
  }, []);

  return (
    <>
      <form className="spot-form" onSubmit={handleSubmit}>
        <h2>Update your Spot</h2>
        <div className="location-container">
          <p>Where's your place located?</p>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label>
            Country
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {validationErrors.country && submitted && (
              <p className="errors">{validationErrors.country}</p>
            )}
          </label>
          <label>
            Street Address
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {validationErrors.address && submitted && (
            <p className="errors">{validationErrors.address}</p>
          )}
          <label className>
            City
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          {validationErrors.city && submitted && (
            <p className="errors">{validationErrors.city}</p>
          )}
          <label>
            State
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          {validationErrors.state && submitted && (
            <p className="errors">{validationErrors.state}</p>
          )}
        </div>

        <div className="description-container">
          <label>
            <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
            <textarea
              className="text-area"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              placeholder="Please write description of home"
            ></textarea>
          </label>
          {validationErrors.description && submitted && (
            <p className="errors">{validationErrors.description}</p>
          )}
        </div>

        <div className="title-place">
          <label>
            <h2>Create a title for your Spot</h2>
            <p>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {validationErrors.name && submitted && (
            <p className="errors">{validationErrors.name}</p>
          )}
        </div>

        <div className="price-container">
          <label>
            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <input
              type="text"
              name="number"
              placeholder="$"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {validationErrors.price && submitted && (
            <p className="errors">{validationErrors.price}</p>
          )}
        </div>
        <button
          type="submit"
          className="create-spot-button"
          onClick={handleSubmit}
        >
          Update Spot
        </button>
      </form>
    </>
  );
};

export default UpdateSpotForm;
