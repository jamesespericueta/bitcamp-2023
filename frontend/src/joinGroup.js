import React from "react";


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
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Query the database with the entered code
      };
      
    return(
        <div>
            <h1>Join a Group</h1>
            <p>Join a group screen</p>
        </div>
    );
}

export default JoinGroupScreen;