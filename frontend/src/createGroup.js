import React from "react";
import {useNavigate} from "react-router-dom";


function CreateGroupScreen(){
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
            <p>Create a group screen</p>
        </div>
    );
}

export default CreateGroupScreen;