import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = e => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: "IneedAJob", password: "password"})).then(closeModal)
  }

  const demoUser2 = e => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: "Healer123", password: "password4"})).then(closeModal)
  }

  return (
    <>
    <div className="login-modal-container">
      <h1 className="login">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="username">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}
        <button type="submit" className="login-button" disabled={(credential.length < 4) || (password.length < 6)}>
          Log In
        </button>
        <button onClick={demoUser} className="demo-button">Demo User</button>
        <button onClick={demoUser2} className="demo-button">Demo User 2</button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
