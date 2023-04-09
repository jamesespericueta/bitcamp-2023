import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import JoinGroupScreen from "./joinGroup";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useState } from "react";
const overHeader = {
    headers:{
        'Content-Type': 'application/json'
    }
}

function JoinGroupButton(){
    let navigate = useNavigate();
     
    return(
        <button id="join-group-button" onClick = {() => navigate("/join-group")}>
            Join New Group
        </button> //add path once new screen is made
    );
}

function CreateNewGroupButton(){
    let navigate = useNavigate();

    return(
        <button id="create-group-button" onClick = {() => navigate("/create-group")}>
            Create New Group
        </button>
    );
}

function MenuScreen() {
    const [data, setData] = useState([
        {}
    ]);

    const generateRows = async() => {
        try{
            const json = JSON.stringify({
                "userID": userID
            });
            const response = await axios.post('http://localhost:8000/api/groups', json, overHeader);
            setData(response.data);
            return data.map((item, index) => {
                return(
                    <tr key={index}>
                        <td>{item.groupName}</td>
                    </tr>
                )
            })
        } catch(err){
            console.error(err);
        }
    };
const {userID}= useContext(AuthContext);
  return (
    <div>
      <h1>Menu Screen</h1>
      <p>{userID}</p>
        <JoinGroupButton />
        <CreateNewGroupButton />
        <table>
            <thead>
                <tr>
                    <th>Group Name</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
      <p>Welcome to the menu screen!</p>
    </div>
  );
}

export default MenuScreen;

/*
//:const INITIAL_STATE = //axios object data


function JoinGroupButton(){
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = 'newPath'; // add path 
        navigate(path);
    }
    return(
        <button onClick={routeChange}>
            Join New Group
        </button>
    );

    //add functionality of this button
}

function CreateNewGroupButton(){
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = 'newPath'; // add path
        navigate(path);
    }
    return(
        <button onClick={routeChange}>
            Create New Group
        </button>
    );

    //add functionality of this button
}

function MenuScreen(){
    const renderUsers = () => {
    return users.map(({ id, name, age, hobby }) => {
      return <tr key={id} >
      <td style={{ padding: '10px', border: '1px solid black' }}>{id}</td>
      <td style={{ padding: '10px', border: '1px solid black' }}>{name}</td>
      <td style={{ padding: '10px', border: '1px solid black' }}>{age}</td>
      <td style={{ padding: '10px', border: '1px solid black' }}>{hobby}</td>
    </tr>
    })
  }

  const renderHeader = () => {
    return <tr>
      {Object.keys(INITIAL_STATE[0]).map(key => <th>{capitalize(key)}</th>)}
    </tr>
  }

  return (
    <div style={{ margin: '50px' }}>
      <JoinGroupButton />
      <CreateNewGroupButton />
      <h2>Users Table</h2>
      <table>
        {renderHeader()}
        <tbody>
          {renderUsers()}
        </tbody>
      </table>
    </div>
  );

}

export default MenuScreen;
*/