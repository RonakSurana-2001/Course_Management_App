import React, { useEffect, useState } from 'react';
import UserDetails from './UserDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import "../Styles/FormDetails.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function FormDetails(props) {
  const [users, setUsers] = useState([]);
  const [toDelete,settoDelete]=useState(false);
  const [individualUsers,setIndividualUsers]=useState()
  useEffect(()=>{
    getAllData();
  },[])

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
  const [credentials, setCredentials] = useState({ price: "",
  placementicon: "No",domain:"",name:"",university:"",certificate:"",faculty:"",learning:"",eligibility:"",imageUrl:"",description:"",programType: "", registrationOpen: ""})

  useEffect(()=>{
    let val1=props.courseNumber;
    const getAllDataUser = async (val1) => {
      const res = await fetch(`http://localhost:3300/auth/users/getclient/${val1}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json1 = await res.json();
      setIndividualUsers([json1]);
    }
    getAllDataUser(val1);
  },[props.courseNumber])

  useEffect(() => {
    if (individualUsers) {
      // console.log(individualUsers[0][0]);
      setCredentials({
        price: individualUsers[0][0] ? individualUsers[0][0].price : "",
        placementicon: individualUsers[0][0] ? (individualUsers[0][0].placement=="yes"?"Yes":"No") : "No",
        domain: individualUsers[0][0] ? individualUsers[0][0].domain : "",
        name: individualUsers[0][0] ? individualUsers[0][0].name : "",
        university: individualUsers[0][0] ? individualUsers[0][0].universityname : "",
        certificate: individualUsers[0][0] ? individualUsers[0][0].certificate : "",
        faculty: individualUsers[0][0] ? individualUsers[0][0].facultyprofile : "",
        learning: individualUsers[0][0] ? individualUsers[0][0].learningHours : "",
        eligibility: individualUsers[0][0] ? individualUsers[0][0].eligibility : "",
        imageUrl: individualUsers[0][0] ? individualUsers[0][0].image : "",
        description: individualUsers[0][0] ? individualUsers[0][0].description: "",
        programType: individualUsers[0][0] ? individualUsers[0][0].program: "",
        registrationOpen: individualUsers[0][0] ? individualUsers[0][0].registrations: ""
      });
    }
  }, [individualUsers]);


  const deleteData = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3300/auth/users/deleteclient/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!res.ok) {
        throw new Error(`Error deleting data: ${res.status}`);
      }
  
      // The response might not be a JSON, so we don't parse it
      console.log("Deletion was successful");
    } catch (error) {
      console.error(error);
    }  
  }


  const handleDelete = async(userId) => {
    console.log(userId);
    await deleteData(userId);
    getAllData();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(props.courseNumber);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3300/auth/users/updateclient/${props.courseNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        price: credentials.price,
        domain: credentials.domain,
        program: credentials.programType,
        registrations: credentials.registrationOpen,
        description: credentials.description,
        placement: credentials.placementicon,
        image: credentials.imageUrl,
        universityname: credentials.university,
        facultyprofile: credentials.faculty,
        learningHours: credentials.learning,
        certificate: credentials.certificate,
        eligibility: credentials.eligibility,
        id: props.courseNumber // Include the ID in the body
      })
    });
  
    const json = await response.json();
    console.log(json);
    await getAllData();
  }
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const value = isChecked ? "Yes" : "No";
    setCredentials({ ...credentials, placementicon: value });
  }

  return (
    <div className='FormDetails-main'>
      {users && users[0] && users[0].map((user, index) => (
        props.courseNumber === user.id && (
          <UserDetails key={index} user={user} onDelete={handleDelete} onClickOpen={handleOpen} />
        )
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='programMain'>
      <div className='program-title'>
        <div className='program-title-font'>Edit Program</div>
        <div>* Required to save as Program</div>
      </div>
      <div className='confirm-program-title'>
        <div className='confirm-program-title-font'>Confirm Program</div>
      </div>
      <div className='confirm-program-fields'>
        <div className='confirm-program-fields-price'><div>Price</div>
        <input
          type="number"
          id="price"
          name="price"
          value={credentials.price}
          onChange={onChange}
        />
        </div>
        <div className='confirm-program-fields-domain'>
          <div>Domain</div>
          <input type="text" id="domain" name="domain" value={credentials.domain} onChange={onChange}/>
        </div>
        <div className='confirm-program-fields-placement'>
          <input type="checkbox"
          id="placementicon"
          name="placementicon"
          value="placementicon"
          onChange={handleCheckboxChange}
          checked={credentials.placementicon === "Yes"}
/>
          <label htmlFor="placementicon">Placement Assurance</label>
        </div>
      </div>
      <div className='info-program-title'>
        <div className='info-program-title-font'>Information</div>
      </div>
      <div className='info-program-row-1'>
        <div className='info-program-row-1-col-1'>
          <div className='info-program-row-1-col-1-title'>Name</div>
          <input type="text" className='info-program-row-1-col-1-textbox' name="name" value={credentials.name} id="name" onChange={onChange}/>
        </div>
        <div className='info-program-row-1-col-2'>
          <div className='info-program-row-1-col-2-title'>Program Type</div>
          <div className='info-program-row-1-col-2-checkbox'>
            <div>
                <input
                type="radio"
                id="programTypeFT"
                name="programType"
                value="FT"
                onChange={onChange}
                checked={credentials.programType === "FT"}
              />
              <label htmlFor="programTypeFT">FT</label>
            </div>
            <div>
                <input
                type="radio"
                id="programTypePT"
                name="programType"
                value="PT"
                onChange={onChange}
                checked={credentials.programType === "PT"}
              />
              <label htmlFor="programTypePT">PT</label>
            </div>
          </div>
        </div>
        <div className='info-program-row-1-col-3'>
          <div className='info-program-row-1-col-3-title'>Registration Open</div>
          <div className='info-program-row-1-col-3-checkbox'>
            <div>
                <input
                type="radio"
                id="registrationOpenYes"
                name="registrationOpen"
                value="Yes"
                onChange={onChange}
                checked={credentials.registrationOpen === "Yes"}
              />
              <label htmlFor="registrationOpenYes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="registrationOpenNo"
                name="registrationOpen"
                value="No"
                onChange={onChange}
                checked={credentials.registrationOpen === "No"}
              />
              <label htmlFor="registrationOpenNo">No</label>
            </div>
          </div>
        </div>
      </div>
      <div className='info-program-row-2'>
        <div className='info-program-row-2-col-1'>
            <div className='info-program-row-2-col-1-title'>University Name/Partner</div>
            <input type="text" className='info-program-row-2-col-1-textbox' name="university" value={credentials.university} id="university" onChange={onChange}/>
        </div>
        <div className='info-program-row-2-col-2'>
            <div className='info-program-row-2-col-1-title'>Certificate/Diploma</div>
            <input type="text" className='info-program-row-2-col-1-textbox' name="certificate" value={credentials.certificate} id="certificate" onChange={onChange}/>
        </div>
        <div className='info-program-row-2-col-3'>
            <div className='info-program-row-2-col-1-title'>Faculty Profile</div>
            <input type="text" className='info-program-row-2-col-1-textbox' name="faculty" value={credentials.faculty} id="faculty" onChange={onChange}/>
        </div>
      </div>
      <div className='info-program-row-3'>
        <div className='info-program-row-3-col-1'>
            <div className='info-program-row-3-col-1-title'>Learning Hours/Duration</div>
            <input type="text" className='info-program-row-3-col-1-textbox' name="learning" value={credentials.learning} id="learning" onChange={onChange}/>
        </div>
        <div className='info-program-row-3-col-2'>
            <div className='info-program-row-3-col-1-title'>Eligibility Criteria</div>
            <input type="text" className='info-program-row-3-col-1-textbox' name="eligibility" value={credentials.eligibility} id="eligibility" onChange={onChange}/>
        </div>
        <div className='info-program-row-3-col-3'>
            <div className='info-program-row-3-col-1-title'>Image Url</div>
            <input type="text" className='info-program-row-3-col-1-textbox' name="imageUrl" value={credentials.imageUrl} id="imageUrl" onChange={onChange}/>
        </div>
      </div>
      <div className='description-data'>
        <label htmlFor="description" className='description-title'>Description</label>
        <input type="text" name="description" className='description-style' value={credentials.description} id="description" onChange={onChange}/>
      </div>
      <div className='add-page-button'>
        <div className='add-page-button-2'>
          <div className='add-page-button-save' onClick={handleSubmit}>Update Program</div>
        </div>
      </div>
    </div>
        </Box>
      </Modal>
    </div>
  )
}

export default FormDetails