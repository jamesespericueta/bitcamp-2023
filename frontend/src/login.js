import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginScreen(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        fetch('/script', {method: form.method, body: formData});
    };

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = './menu.js';
        navigate(path);
    }

    return(
        <Router>
        <div>
            <h1>Login Screen</h1>
            <form action="/script" onSubmit = {handleSubmit}>
               <label>
                Email:
                <input
                 type = "email"
                 id = "username"
                 value = {email}
                 onChange = {(event) => setEmail(event.target.value)}
                 />
                </label>
                <br />
                <label>
                Password:
                <input
                 type = "password"
                 id = "password"
                 value = {password}
                 onChange = {(event) => setPassword(event.target.value)}
                 />    
                </label>
                <br />
                <button type = "submit"
                 onClick={routeChange}
                >Login</button> 
            </form>
            <script src="script.js"></script>
        </div>
        </Router>
    );
}

export default LoginScreen;