import React, { useEffect } from 'react'
import { useState } from 'react';
import "../Styles/Sidebar.css"
import SidebarItems from './SidebarItems';
import SidebarCategory from './SidebarCategory';
function Sidebar(props) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [credentials, setCredentials] = useState({ name: "" })
  const [box, setBox] = useState(new Set());
  useEffect(() => {
    getAllData();
  }, [])

  useEffect(() => {
    getAllData();
    propertyChange();
  }, [users]);

  const getAllData = async () => {
    const res = await fetch("http://localhost:3300/auth/users/getclient", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json1 = await res.json();
    setUsers([json1]);
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const propertyChange = async () => {
    if (users !== undefined && users.length > 0 && users[0].length > 0) {
      for (let i = 0; i < users[0].length; i++) {
        box.add(users[0][i].domain)
      }
    }
    // console.log(box);
  };

  return (
    <>
      <div className='sidebarInside'>
        <div className='sidebarContainer'>
          <div className='sidebarContainer-1'>
            <div className='sidebarContainer-11'>Programs</div>
            <div className='sidebarContainer-12'>{users && users[0] ? users[0].length : 0} Total</div>
          </div>
          <div className='sidebarContainer-2' onClick={() => props.settingPage()}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 14 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path></svg>
          </div>
        </div>
        <div className='search-area'>
          <div className='search-area-1'>
            <div className='search-icon'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" ></path></svg></div>
            <input type="text" placeholder='Search' id="Search" onChange={onChange} value={credentials.name} name="name" ></input>
          </div>
        </div>
        <div className='domain-icons'>
          <div className='domain-icons-design'>
            <div className='domain-icons-design-all' onClick={() => handleFilterChange("All")}>All</div>
            {Array.from(box).length > 0 && Array.from(box).map((user, index) => {
              return <SidebarCategory key={index} items={user} val={handleFilterChange} />
            })}
          </div>
        </div>
        <div className='programList'>
          {users && users[0] && users[0].map((user, index) => {
            return (filter === "All" || user.domain === filter) && (credentials.name.trim() === '' || user.name.includes(credentials.name.trim())) && <SidebarItems key={index} items={user} onClick={() => props.setcourseNumberFunction(user.id)} />
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebar