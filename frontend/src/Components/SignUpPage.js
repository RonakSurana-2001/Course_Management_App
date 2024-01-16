import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function SignUpPage() {

  const [credentials, setCredentials] = useState({name:"" ,email:"",password:"",otp:""});
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit=async()=>{
    // e.preventDefault();
    const response = await fetch("http://localhost:3300/log/users/addUserDataSignUp", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,otp:credentials.otp})
    });
    const responseText = await response.text();
    console.log(responseText);
    if(responseText=="Insertion was successful"){
      navigate('/');
    }
    else if(responseText==="Invalid Otp"){
      alert("Invalid OTP");
    }
    else{
      alert("User Already Exits");
    }
  }
  const handleOtpRequest=async()=>{
    const response = await fetch("http://localhost:3300/log/users/generateOtp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:credentials.email})
    });
    const json=await response.json();
  }
  return (
    <div className='login-func'>
    <div className='login-func-title'>
      <div className='login-func-title-1'>Create Account</div>
    </div>
    <div className='login-func-content'>
      <input type="text" placeholder="Name" id="name" name="name" value={credentials.name} onChange={onChange}/>
      <input type="email" placeholder="Email" id="email" name="email" value={credentials.email} onChange={onChange}/>
      <input type='password' placeholder="Password" id="password" name="password" value={credentials.password} onChange={onChange}/>
      <input type='text' placeholder="OTP" id="otp" name="otp" value={credentials.otp} onChange={onChange}/>
    </div>
    <div className='login-func-loginButton'>
      <div>
        <button onClick={handleSubmit}>Create Account</button>
      </div>
      <div>
        <button onClick={handleOtpRequest}>Generate OTP</button>
      </div>
    </div>
    <div className='login-func-bottonPart'>
      Already have an account? <Link to="/" style={{textDecoration:"none",fontWeight:"bolder",color:"blue"}}>Login</Link>
    </div>
  </div>
  )
}

export default SignUpPage