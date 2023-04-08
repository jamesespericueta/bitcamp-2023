import logo from './logo.svg';
import './App.css';
import LoginScreen from './login.js';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuScreen from "./menu"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
