import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createASpot } from "../../store/spots";
import "./SpotForm.css";


const NewSpotForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(1);
  const [lng, setLng] = useState(1);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    if (!image1) errors.image = "Please provide a valid preview image."
    if (image1 && (!image1.includes('.png') && !image1.includes('.jpeg') && !image1.includes('.jpg'))) errors.image1 = "Image URL must end in .png, .jpg, .jpeg"
    if(image2 && (!image2.includes('.png') || !image2.includes('.jpeg') || !image2.includes('.jpg'))) errors.image2 = "Image URL must end in .png, .jpg, .jpeg"
    if(image3 && (!image3.includes('.png') || !image3.includes('.jpeg') || !image3.includes('.jpg'))) errors.image3 = "Image URL must end in .png, .jpg, .jpeg"
    if(image4 && (!image4.includes('.png') || !image4.includes('.jpeg') || !image4.includes('.jpg'))) errors.image4 = "Image URL must end in .png, .jpg, .jpeg"
    if(image5 && (!image5.includes('.png') || !image5.includes('.jpeg') || !image5.includes('.jpg'))) errors.image5 = "Image URL must end in .png, .jpg, .jpeg"


    setValidationErrors(errors);
  }, [country, address, city, state, description, name, price, image1, image2, image3, image4, image5]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!Object.values(validationErrors).length) {
      const newSpot = {
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name,
        price: Number(price)
      };

      const newImage = [image1, image2, image3, image4, image5];

      for(let i = 0; i < newImage.length; i++) {
        if(!newImage[i]) {
          newImage[i] = "https://i.imgur.com/uvDIMUl.jpg"
        }
      }

      const makeNewSpot = await dispatch(createASpot(newSpot, newImage));
      history.push(`/spots/${makeNewSpot.id}`);
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
        <h2>Create a new Spot</h2>
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
              placeholder="Country"
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
              placeholder="Address"
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
              placeholder="City"
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
              placeholder="STATE"
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
              placeholder="Please write a description of your home..."
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
              placeholder="Name of your spot"
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
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {validationErrors.price && submitted && (
            <p className="errors">{validationErrors.price}</p>
          )}
        </div>

        <div className="url-container">
          <label>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot</p>
            <div className="input-container">
              <input
                type="text"
                name="url"
                placeholder="Preview Image URL"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
              />
              {validationErrors.image && submitted && (
           <p className="errors">{validationErrors.image}</p>
         )}
              {validationErrors.image1 && submitted && (
           <p className="errors">{validationErrors.image1}</p>
         )}
              <input
                type="text"
                name="url"
                placeholder="Image 2 URL"
                value={image2}
                required
                onChange={(e) => setImage2(e.target.value)}
              />
              {validationErrors.image2 && submitted && (
           <p className="errors">{validationErrors.image2}</p>
         )}
              <input
                type="text"
                name="url"
                placeholder="Image 3 URL"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              />
              {validationErrors.image3 && submitted && (
           <p className="errors">{validationErrors.image3}</p>
         )}
              <input
                type="text"
                name="url"
                placeholder="Image 4 URL"
                value={image4}
                onChange={(e) => setImage4(e.target.value)}
              />
              {validationErrors.image4 && submitted && (
           <p className="errors">{validationErrors.image4}</p>
         )}
              <input
                type="text"
                name="url"
                placeholder="Image 5 URL"
                value={image5}
                onChange={(e) => setImage5(e.target.value)}
              />
              {validationErrors.image5 && submitted && (
           <p className="errors">{validationErrors.image5}</p>
         )}
            </div>
          </label>
        </div>

        <button type="submit" className="create-spot-button" onClick={handleSubmit}>
          Create Spot
        </button>
      </form>
    </>
  );
};

export default NewSpotForm;
