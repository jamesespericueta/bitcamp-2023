import React, { useState } from "react";
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";

function JoinGroupScreen(){
    const {user} = useContext(AuthContext);
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
    const [code, setCode] = useState("");
    const [groupExists, setGroupExists] = useState(null);

    function handleCodeChange(event) {
        setCode(event.target.value);
    };

   const handleSubmit = async (event) => {
        event.preventDefault();
        // TODO: Query the database with the entered code
        try {
            const response = await axios.get(`http://localhost:8000/api/groups/${code}`);
            if (response.status === 200) {
                setGroupExists(true);
            } else {
                setGroupExists(false);
            }
          } catch (error) {
            setGroupExists(false);
            console.error(error);
          }
    };

    return(
        <div>
            <h1>Join a Group</h1>
            <p>Join a group screen</p>
            <form onSubmit={handleSubmit}>
                <label>
                Enter the join code:
                <input type="text" value={code} onChange={handleCodeChange} />
                </label>
                <button type="submit">Join Group</button>   
            </form>
            {groupExists !== null && (
                <p>{groupExists ? "Group exists!" : "Group does not exist!"}</p>
            )}
        </div>
    );
}

export default JoinGroupScreen;