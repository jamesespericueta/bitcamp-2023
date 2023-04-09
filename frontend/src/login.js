import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuScreen from "./menu"
import { createContext } from "react";
import axios from "axios"

const AuthContext = createContext();

const overHeader = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const currentUser = useContext(AuthContext);
  const[currentUser, setCurrentUser] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("my nuts");
    try{
      const json = JSON.stringify({
        "email": email,
        "password": password
      });
      console.log("before ax");
      const response = await axios.post('localhost:8000/api/login', json);
      // Perform login logic here
      //const[currentUser, setCurrentUser] = useState("");
      setUser({'userID': response.userID});

      if(response.success)
      {
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
