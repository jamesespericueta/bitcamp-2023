import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const overHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function RegisterScreen(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const json = JSON.stringify({
                "email": email,
                "password": password,
                "username": username
            });

            const response = await axios.post('http://localhost:8000/api/register', json, overHeader);

            if(response.success){
                navigate("/");
            } else {
                console.log("user already exists");
            }
        } catch(error){
            console.error(error);
        }
    };

    return(
        <div>
           <h1>Register Screen</h1>
           <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="username"
                    value={username}
                    onChange = {(event) => setUserName(event.target.value)}
                />
            </label>
            <br />
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
            <button type="submit">Register</button>
            </form> 
        </div>
    );
}
export default RegisterScreen;