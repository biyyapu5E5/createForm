import React, {useState, useRef} from 'react';
import './style.css';

export default function App() {
  const [formData, setFormData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showformDetails, setShowFormDetails] = useState(false);
  const [showFormContainer, setShowFormContainer] = useState(true);
  const nameFieldRef = useRef(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.lbname.value;
    const type = e.target.typefield.value;
    
    setFormData((prev)=> [...prev, {name, type}])
    e.target.reset();
    setShowForm(false);
    setShowFormDetails(false);
  }


  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowFormDetails(true);
  }

  const handleReset = ()=> {
    nameFieldRef.current.focus();
    setShowFormContainer(false);
    setShowForm(false);
    setShowFormDetails(false);
  }

  return (
    <div id='main-container'>
      <p id='heading'>Custom Form Builder </p>
      {/* Form Container */}
      <form id = 'container' onSubmit = {handleSubmit}>
        <p> <b>Enter Label Name:</b></p>
        <input  ref = {nameFieldRef} type="text" name="lbname" id="lbname" placeholder = 'Enter Label Name' required/>
        <p><b>Select Field Type:</b></p>
        <select name="typefield" id="typefield">
          <option value="text" default>text</option>
          <option value="number">number</option>
          <option value="email">email</option>
          <option value="password">password</option>
        </select>
        <button type="submit" >ADD</button>
      </form>

      {/* Review Your Details */}
      { showFormContainer &&
        <form id = 'sub-container'>
          {
            formData.length > 0 && 
            <div className = 'details'>
              <p className='h-formDeatils'>Review Your Details</p>
              { 
                formData.map((i) => 
                  <div> 
                      <p><b>Label: </b> {i.name}</p>
                      <p><b>Type: </b> {i.type}</p>
                  </div>)
              }
            {formData.length> 0 && <button onClick = {handleClick}> Submit </button>}
          </div>
          }
          {/* Add Your Details */}
          {
            showForm && 
            <div className = 'dynamic-form'>
               <p className='h-formDeatils'>Add Your Details</p>
              { formData.map((i) => 
                    <CreateForm 
                      name = {i.name} 
                      type = {i.type} 
                      formData = {formData}
                      setFormData = {setFormData} 
                      showformDetails = {showformDetails}/>) 
              }
              <button onClick = {handleFormSubmit}> Submit </button>
            </div>
          }
        </form>
      }
      {/* Your Details */}
      { 
        showformDetails && 
        <div className = 'dynamic-form'>
          <p className='h-formDeatils'>Your Details</p>
          {formData.map((i) => 
              <p> <b>{i.name}</b> : {i.value}</p>) 
          }
        <button onClick = {handleReset}>Create New Custom Form</button>
        </div>
      }
    </div>
  )
}

// Dynamic Form Rendering using CreateForm Component
function CreateForm({name, type, formData, setFormData, showformDetails}) {
  
    const handleChange = (e) => {
      const val = e.target.value;
      const newValue = type === 'number' ? Number(val) : val;
      setFormData(prev => prev.map((i) => i.name == name ? {...i, value: newValue}: i));
    }
    const filterVal = formData.filter(i => i.name==name);
    
    return (
      <>
        <b><label htmlFor = {name}> {name} </label></b>
        <input 
          type=  {type}
          id = {name}
          name = {name}
          value = {showformDetails == true? '': filterVal.value}
          placeholder = {`Enter your ${name}`}
          onChange = {handleChange}
          />
      </>
      )
}[]
