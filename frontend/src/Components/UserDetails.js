import React from 'react'
import "../Styles/FormDetails.css"


function UserDetails(props) {
    // console.log(props.user);
    const handleDelete = () => {
        // Call the onDelete prop passed from FormDetails with the user id
        props.onDelete(props.user.id);
    };    

    const openThem=()=>{
      props.onClickOpen();
    }
    
  return (
    <>
        <div className='FormDetails-size'>
        <div>Name:{props.user.name}</div>
        <div>Price: {props.user.price}</div>
        <div>Certificate: {props.user.certificate}</div>
        <div>Description: {props.user.description}</div>
        <div>Eligibility: {props.user.eligibility}</div>
        <div>Faculty Profile: {props.user.facultyprofile}</div>
        <div>Learning Hours: {props.user.learningHours}</div>
        <div>Placement Guaranteed: {props.user.placement}</div>
        <div>Program Type: {props.user.program}</div>
        <div>Registration Open: {props.user.registrations}</div>
        <div>University Name: {props.user.universityname}</div>
    </div>
    <div className='add-page-button-1'>
        <div className='add-page-button-delete' onClick={handleDelete}>Delete</div>
        <div className='add-page-button-delete' onClick={openThem}>Edit</div>
    </div>
    </>
  )
}

export default UserDetails