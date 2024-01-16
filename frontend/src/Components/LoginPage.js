import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/LoginPage.css";
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const [credentials, setCredentials] = useState({ email:"",password:""});
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit=async()=>{
    // e.preventDefault();
    const response = await fetch("http://localhost:3300/log/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.text();
    if(json=="Yes"){
      localStorage.setItem("userEmail",credentials.email);
      navigate('/MainPage');
    }
    else{
      alert("Invalid Email or Password");
    }
  }

  return (
    <div className='login-func'>
      <div className='login-func-title'>
        <div className='login-func-title-1'>Sign-in</div>
      </div>
      <div className='login-func-content'>
        <input type="email" placeholder="Email" id="email" name="email" value={credentials.value} onChange={onChange} />
        <input type='password' placeholder="Password" id="password" name="password" value={credentials.value} onChange={onChange}/>
      </div>
      <div className='login-func-loginButton'>
        <button onClick={handleSubmit}>Login</button>
      </div>
      <div className='login-func-bottonPart'>
        Don't have an account? <Link to="/SignUp" style={{textDecoration:"none",fontWeight:"bolder",color:"blue"}}>Signup Here</Link>
      </div>
    </div>
  );
}

export default LoginPage;
