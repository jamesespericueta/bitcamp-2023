import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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