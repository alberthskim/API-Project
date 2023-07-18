import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import leaf from '../../assets/mapleleaf.png'
import { useHistory } from "react-router-dom";

import "./Navigation.css";
import { getAllSpots, getSingleSpot } from "../../store/spots";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const spots = Object.values(useSelector(state=> state.spots.allSpots))

	const [word, setWord] = useState("")
	const [search, setSearched] = useState(false)

  const [searchStatus, setSearchStatus] = useState(false)
	const [searchInfo, setSearchInfo] = useState([])
	const [input, setInput] = useState("")

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const searchFinder = spots.filter(spot => {
		const spotName = spot.name.toLowerCase()
    const spotAddress = spot.address.toLowerCase()
    const spotCity = spot.city.toLowerCase()
    const spotCountry = spot.country.toLowerCase()
    const spotState = spot.state.toLowerCase()

		return spotName.includes(word.toLowerCase()) || spotAddress.includes(word.toLowerCase()) ||
		spotCity.includes(word.toLowerCase()) || spotCountry.includes(word.toLowerCase()) ||
		spotState.includes(word.toLowerCase())
	})

  const handleSubmit = async (e) => {
		e.preventDefault()

		let searchSpots = spots.filter(spot => spot.name.toLowerCase().includes(word.toLowerCase()) || spot.address.toLowerCase().includes(word.toLowerCase()) || spot.city.toLowerCase().includes(word.toLowerCase()) || spot.country.toLowerCase().includes(word.toLowerCase()) || spot.state.toLowerCase().includes(word.toLowerCase()));
		setInput(word)
		setSearchInfo(searchSpots)
		setSearchStatus(true)
		setSearched(false)
		setWord("")
		// history.push('/search/results');
	}


  return (
    <div className="nav-container">
      <ul className="nav-list">
        <li>
          <NavLink exact to="/" className="logo">
            <h1 className="nav-title" onClick={() => dispatch(getAllSpots())}><img src={leaf} className="nav-leaf"/> storybnb</h1>
          </NavLink>
        </li>

        <form className="search-bar" onSubmit={handleSubmit} >
          <input
            className="search-input"
            placeholder='Search And Click Your Next Destination!'
            type="text"
            value={word}
            onChange={(e) => {
              setWord(e.target.value)
            }}
          />
          {/* <div className="search-icon">
            <button className="search-enter" type="submit"><i class="fa-solid fa-magnifying-glass" style={{cursor:"pointer"}}></i></button>
          </div> */}
          {word ? (
          <div className={search ? 'hide-search' : 'show-search'}>
            {searchFinder.map((spot) => (
              <div className="search-content">
                <div className="right-side-search-area">
                  <div className="search-word" onClick={() => {
                    dispatch(getSingleSpot(spot.id))
                    history.push(`/spots/${spot.id}`)
                    setWord("")
                  }}>
                    <img className="search-img" src={spot.previewImage}></img>
                    <p>{spot.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          ) : null
          }
        </form>

        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
