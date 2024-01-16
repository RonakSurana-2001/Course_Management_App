import {React,useEffect,useState} from 'react'
import "../Styles/FormMain.css"
function FormMain(props) {
  const [credentials, setCredentials] = useState({ price: "",placementicon: "No",domain:"",name:"",university:"",certificate:"",faculty:"",learning:"",eligibility:"",imageUrl:"",description:"",programType: "", registrationOpen: ""})
  // console.log(props.courseNumber);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3300/auth/users/addUserData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:credentials.name,price:credentials.price,domain:credentials.domain,program:credentials.programType,registrations:credentials.registrationOpen,description:credentials.description,placement:credentials.placementicon,image:credentials.imageUrl,universityname:credentials.university,facultyprofile:credentials.faculty,learningHours:credentials.learning,certificate:credentials.certificate,eligibility:credentials.eligibility})
    });
    const json = await response.json();
    // clearForm()
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const value = isChecked ? "Yes" : "No";
    setCredentials({ ...credentials, placementicon: value });
  }


  // const clearForm=()=>{
  //   setCredentials({price: "",placementicon: "",domain:"",name:"",university:"",certificate:"",faculty:"",learning:"",eligibility:"",imageUrl:"",description:"",programType: "", registrationOpen: ""});
  // }

  useEffect(() => {
      // console.log(individualUsers[0][0]);
      setCredentials({
        price: localStorage.getItem("price") ? localStorage.getItem("price") : "",
        placementicon: localStorage.getItem("placement"),
        domain: localStorage.getItem("domain")==="undefined"?"":localStorage.getItem("domain"),
        name: localStorage.getItem("name")==="undefined"?"":localStorage.getItem("name"),
        university: localStorage.getItem("universityname")==="undefined"?"":localStorage.getItem("universityname"),
        certificate: localStorage.getItem("certificate")==="undefined"?"":localStorage.getItem("certificate"),
        faculty: localStorage.getItem("facultyprofile")==="undefined"?"":localStorage.getItem("facultyprofile"),
        learning: localStorage.getItem("learningHours")==="undefined"?"":localStorage.getItem("learningHours"),
        eligibility: localStorage.getItem("eligibility")==="undefined"?"":localStorage.getItem("eligibility"),
        imageUrl: localStorage.getItem("image")==="undefined"?"":localStorage.getItem("image"),
        description: localStorage.getItem("description")==="undefined"?"":localStorage.getItem("description"),
        programType: localStorage.getItem("program"),
        registrationOpen: localStorage.getItem("registrations")
      });
  }, []);

  const handleDraft=()=>{
    localStorage.setItem("name",credentials.name);
    localStorage.setItem("price",credentials.price);
    localStorage.setItem("domain",credentials.domain);
    localStorage.setItem("program",credentials.programType);
    localStorage.setItem("registrations",credentials.registrationOpen);
    localStorage.setItem("description",credentials.description);
    localStorage.setItem("placement",credentials.placementicon);
    localStorage.setItem("image",credentials.imageUrl);
    localStorage.setItem("universityname",credentials.university);
    localStorage.setItem("facultyprofile",credentials.faculty);
    localStorage.setItem("learningHours",credentials.learning);
    localStorage.setItem("certificate",credentials.certificate);
    localStorage.setItem("eligibility",credentials.eligibility);
  }

  return (
    <div className='programMain'>
      <div className='program-title'>
        <div className='program-title-font'>Add Program</div>
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
          <div className='add-page-button-draft' onClick={handleDraft}>Save Draft</div>
          <div className='add-page-button-save' onClick={handleSubmit}>Save Program</div>
        </div>
      </div>
    </div>
  )
}

export default FormMain