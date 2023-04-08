import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
//post group name to /api/createGroup


function CreateGroupScreen(){
     const[groupName, setGroupName] = useState("");

     function handleCodeChange(event) {
        setGroupName(event.target.value);
    };

     const handleSubmit = (event) => {
        event.preventDefault();
     }

     const sendName = async() =>{
        try{
            const response = await axios.post('/api/createGroup', groupName);
        } catch(error){
            console.log(error);
        }
    };
    /* TODO
     * Expected Behavior:
     *    When new group is created:
     *      - generate QR Code
     *      - generate join code
     *      - ? generate deeplink
     *      - store join code (and) QR Code in db 
     *    When join group is requested:
     *      - prompt user's camera
     *      - have option for user to type code manually
     *      - query db to check for code
     */ 
    return(
        <div>
            <h1>Create a Group</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Group Name:
                    <input
                        type="name"
                        value={groupName}
                        onChange ={(event) => setGroupName(event.target.value)}
                        />
                </label>
                <button onClick={sendName}>Add</button>
            </form>
        </div>
    );
}

export default CreateGroupScreen;