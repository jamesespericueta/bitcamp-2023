import { createContext } from 'react';
import { useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userID, setUserID] = useState("temp");

    const updateUserID = (newUserID) => {
        setUserID(newUserID)
    }
    
    const value ={
        userID,
        updateUserID
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
