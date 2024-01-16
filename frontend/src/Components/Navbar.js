import React from 'react'
import "../Styles/Navbar.css"
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // e.preventDefault();
        const response = await fetch("http://localhost:3300/log/users/logout", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const json = await response.json();
      }

    const handleChange=()=>{
        localStorage.removeItem("userEmail");
        navigate("/");
        handleLogout();
    }

  return (
    <div className='container'>
        <div className='container-1'>
            <div className='sidebar-shift'>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z" color="white"></path></svg>
            </div>
        </div>
        <div className='container-2'>
            <div className='logo-1'>Logo</div>
        </div>
        <div className='container-3'>
            <div className='button-1' onClick={handleChange}>{localStorage.getItem("userEmail")}</div>
        </div>
    </div>
  )
}

export default Navbar
