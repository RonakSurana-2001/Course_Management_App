import React, { useEffect, useState } from 'react'
import "../Styles/MainPage.css"
import Sidebar from "./Sidebar"
import FormMain from './FormMain'
import FormDetails from "./FormDetails"
import Navbar from "../Components/Navbar"
function MainPage() {
  const [page,setPage]=useState("notmain");
  const [courseNumber, setCourseNumber] = useState(0);

  const settingPage=()=>{
    if(page==="main"){
      setPage("notmain");
    }
    else{
      setPage("main");
    }
  }

  const setcourseNumberFunction = (id) => {
    setCourseNumber(id);
  };

  return (
    <>
      <Navbar/>
        <div className='containerMainPage'>
            <div className='Sidebar'>
                {/* Part-1 */}
                <Sidebar settingPage={settingPage} setcourseNumberFunction={setcourseNumberFunction}/>
            </div>
            <div className='formMain'>
                {/* Part-2 */}
                {page=="main"?<FormMain courseNumber={courseNumber}/>:<FormDetails courseNumber={courseNumber}/>}
            </div>
        </div>
    </>
  )
}

export default MainPage