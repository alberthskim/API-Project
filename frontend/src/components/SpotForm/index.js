import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const NewSpotForm = ({ spot }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const errors = {};
        if(!country || country.length < 5 || country.length > 50) errors.country = "Country must exist and must be greater than 5 characters and less than 50 characters."
        if(!address || address.length < 5 || address.length > 255) errors.address = "Address must exist and must be greater than 5 characters and less than 255 characters."
        if(!city || city.length < 5 || city.length > 50) errors.city = "City must exist and must be greater than 5 characters and less than 50 characters."
        if(!state || state.length < 2 || state.length > 50) errors.state = "State must exist and must be greater than 2 characters and less than 50 characters."
        if(!lat) errors.lat = "Please enter a latitude."
        if(!lng) errors.lng = "Please enter a longitude."
        if(!description || description.length < 10 || description.length > 500) errors.description = "Description must exist and must be greater than 10 characters and less than 500 characters."
        if(!name || name.length < 5 || name.length > 50) errors.name = "Name must exist and must be greater than 5 characters and less than 50 characters."
        if(!price) errors.price = "Price must have a minimum of $0 a night."
        if(!image) errors.image = "Please provide atleast 1 image."
        setValidationErrors(errors)
    }, [country, address, city, state, lat, lng, description, name, price, image])

    // const onSubmit = async (e) => {
    //     e.preventDefault();

    // }

    return (
        <>
        <form>
            <h2>Create a new Spot</h2>
            <p>Where's your place located?</p>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>
                Country
                <input></input>
            </label>
        </form>
        </>
    )
}

export default NewSpotForm;
