import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuScreen from "./menu";
import { createContext } from "react";
import axios from "axios"
import { AuthContext } from "./AuthContext";

const overHeader = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function RegisterButton(){
  let navigate = useNavigate();

  return(
    <button id="reigster-button" onClick={() => navigate("/register")}>
      Register
    </button>
  )
}

function LoginScreen() {
  const {userID, updateUserID} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const currentUser = useContext(AuthContext);
  const[currentUser, setCurrentUser] = useState("");


  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const json = JSON.stringify({
        "email": email,
        "password": password
      });
<<<<<<< HEAD
      console.log("before ax");
=======
>>>>>>> 8377e67a6305732d82ab7da8868c093192f895ad
      const response = await axios.post('http://localhost:8000/api/login', json, overHeader);
      // Perform login logic here
      //const[currentUser, setCurrentUser] = useState("");
      console.log(response.data)
      if(response.data.success)
      {
        updateUserID(response.data.userID)
        navigate("/menu");
      }
      // Navigate to the menu screen
    } catch(err){
      console.error(err)
    }
  };


  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{user, setUser}}>
    <div>
      <h1>Login Screen</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange = {(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange = {(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <RegisterButton />
      </form>
    </div>
    </AuthContext.Provider>
  );
}

export default LoginScreen;
