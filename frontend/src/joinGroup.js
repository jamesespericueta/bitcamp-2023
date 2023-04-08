import React, { useState } from "react";


function JoinGroupScreen(){
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

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Query the database with the entered code
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
        </div>
    );
}

export default JoinGroupScreen;