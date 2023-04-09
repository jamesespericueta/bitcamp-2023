import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import QRCode from 'qrcode.react';
//post group name to /api/createGroup

function QRCodeGenerator({code}){
    return(
        <QRCode value = {code.toString()} />
    )
}


function CreateGroupScreen(){
     const[groupName, setGroupName] = useState("");
     const[joinCode, setJoinCode] = useState(null);
     const[qrCode, setQRCode] = useState(null)
    
     function handleCodeChange(event) {
        setGroupName(event.target.value);
    };

     const handleSubmit = (event) => {
        event.preventDefault();
     }

     const sendName = async() =>{
        try{
           // const json = JSON.stringify({
            //    "groupName": groupName,
              //  "userID": userID
            //})
            const response = await axios.post('/api/createGroup', groupName);
            setJoinCode(response.data.code);
            
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
                <QRCodeGenerator code = {joinCode}/>
            </form>
        </div>
    );
}

export default CreateGroupScreen;