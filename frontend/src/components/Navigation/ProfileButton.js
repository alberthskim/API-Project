import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="login-user-ability">
        {user ? (
          <NavLink to="/spots/new" className="create-link">
            Create A Spot
          </NavLink>
        ) : (
          ""
        )}
      </div>
      <button onClick={openMenu} className="profile">
        <i className="fa-solid fa-bars"></i>
        <i className="fa-sharp fa-solid fa-circle-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-info">
              <div className="first-last-name">
                <span>
                  Hello, {user.firstName} {user.lastName}
                </span>
                <span>{user.email}</span>
              </div>
              <div>
                <NavLink to="/spots/current" onClick={closeMenu}>Manage Spots</NavLink>
              </div>
              <div>
                <NavLink to={`/user/${user.id}/bookings`} onClick={closeMenu}>Manage Bookings</NavLink>
              </div>
              <div>
                <button onClick={logout} className="modal-button">
                  Log Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="login-signup">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
