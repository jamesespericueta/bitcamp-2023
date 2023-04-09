import './App.css';
import LoginScreen from './login.js';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuScreen from "./menu.js";
import JoinGroupScreen from './joinGroup.js';
import CreateGroupScreen from './createGroup.js';
import RegisterScreen from './register.js';
import { AuthContext } from './AuthContext';
import { useState } from 'react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/create-group" element={<CreateGroupScreen />} />
          <Route path="/join-group" element={<JoinGroupScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
