import React from "react";
import {userNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useState } from "react";

const overHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function Members() {
    const data = async() => {
        try{
            const json = JSON.stringify({
                "userID": userID
            });
            const response = await axios.post('http://localhost:8000/api/groups', json, overHeader);
            if(response.rows[0]){
                response.status(200).send();
            }
            return(response.data);
        } catch (err){
            console.error(err);
        }
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>GroupName</th>
                    </tr>
                </thead>

            </table>
        </div>
    )
}