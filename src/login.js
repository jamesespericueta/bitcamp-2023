import React, {useState} from "react";

function LoginScreen(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        fetch('/login', {method: form.method, body: formData});
    };

    return(
        <div>
            <h1>Login Screen</h1>
            <form onSubmit = {handleSubmit}>
               <label>
                Email:
                <input
                 type = "email"
                 value = {email}
                 onChange = {(event) => setEmail(event.target.value)}
                 />
                </label>
                <br />
                <label>
                Password:
                <input
                 type = "password"
                 value = {password}
                 onChange = {(event) => setPassword(event.target.value)}
                 />    
                </label>
                <br />
                <button type = "submit">Login</button> 
            </form>
        </div>
    );
}

export default LoginScreen;