// import logo from './logo.svg';
import './App.css';
// import Navbar from "../src/Components/Navbar"
import MainPage from './Components/MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/SignUp" element={<SignUpPage />}/>
        <Route path="/MainPage" element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
