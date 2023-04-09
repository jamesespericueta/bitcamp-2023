import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuScreen from "./menu";
import { createContext } from "react";
import axios from "axios";

const AuthContext = createContext();



function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const currentUser = useContext(AuthContext);
  const[currentUser, setCurrentUser] = useState("");

  let navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const response = axios.post('http://localhost:8000/api/login', { email, password })
        .then(response => {
            setCurrentUser(response.data.userID);
            navigate("/menu")
        })
        .catch(error => {
            console.log(error);
        })
    // Perform login logic here
    //const[currentUser, setCurrentUser] = useState("");
  };

  return (
    <AuthContext.Provider value={currentUser}>
    <div>
      <h1>Login Screen</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    </AuthContext.Provider>
  );
}

export default LoginScreen;
