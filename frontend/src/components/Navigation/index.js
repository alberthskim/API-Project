import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import leaf from '../../assets/mapleleaf.png'
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">
      <ul className="nav-list">
        <li>
          <NavLink exact to="/" className="logo">
            <h1 className="nav-title"><img src={leaf} className="nav-leaf"/> storybnb</h1>
          </NavLink>
        </li>
        <li>
          {/* <input className="search"></input> */}
        </li>
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
