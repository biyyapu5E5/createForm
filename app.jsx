import React, {useEffect, useState} from 'react';

export default function App() {
  const [fieldsCount, setFieldsCount] = useState(0);
  const [userInput, setUserInput] = useState([]);
  useEffect(()=> {
    setFieldsCount(Number(prompt('Enter how many fields: ')));
    const inputs = prompt('Enter type of the input field with comma (,) separated:');
    setUserInput(inputs.split(","));
  }, [])
  return (
    <div>
        <h1>MY Form</h1>
        <br />
        {userInput.length > 0 && 
          <div>
            { userInput.map((i, index)=> {
                return <div> <CreateForm type = {i} key = {index}/> <br /> </div> 
                })
            }
          </div>
        }
    </div>
  )
}

function CreateForm(props) {
  const [myform, setMyForm] = useState({});

  useEffect(()=> {
    let id, name, requiredCheck, label, forLabel, labelValue;
    if(props.type == 'text' || props.type == 'email' || props.type == 'password') {
     id = prompt(`enter id (Feild type - ${props.type}):`);
     name = prompt(`enter name: (Feild type - ${props.type})`);
     requiredCheck = prompt(`Required attribute true or false (Feild type - ${props.type})`);
     label = prompt(`Need Label true or false (Feild type - ${props.type})`);
      if(label === 'true') {
         forLabel = prompt(`enter for attribute name label: (Feild type - ${props.type})`);
        labelValue = prompt(`enter the value for label: (Feild type - ${props.type})`);
      }
    }
    setMyForm({id, name, requiredCheck, label, forLabel, labelValue});
    console.log(myform)
  }, [props.type]);

  
    return (
      <>
        {myform.label && <label htmlFor = {myform.forLabel}> {myform.labelValue} </label>}
        <input 
          type=  {props.type}
          id = {myform.id}
          name = {myform.name}
          required = {myform.requiredCheck==='true'} 
          />
      </>
      )
}
