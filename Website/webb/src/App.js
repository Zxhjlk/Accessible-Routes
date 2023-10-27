import './App.css';
import MyMap from './common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState, useEffect} from 'react';
import Select from 'react-select';
import {AwesomeButtonProgress} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css'; 
import axios from 'axios';



function App() {
  Call();
  return (
    <div className="Page">
        <MyMap/>
        <div className="Search">
            <StartDropDown/>
            <EndDropDown/>
            <Button/>
        </div>
    </div>
  );
}

const Button = () => {
  return (
    <AwesomeButtonProgress type="secondary"
      onPress={async (element, next)=>{
        next();
      }}>
        Start
    </AwesomeButtonProgress>
  );
}

const options = [
  { value: 'test', label: 'Amos Eaton' },
  { value: 'test2', label: 'DCC'}
]

var buildings = []

const no_duplicates = new Set()

function containsBuilding(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i].Name === obj.label) {
          return true;
      }
  }

  return false;
}

//WILL BE CHANGED TO FIT WITH NEW JSON FORMAT
const Call = () => {
  buildings = []
  axios
    .get('http://127.0.0.1:8000/api/all-buildings')
    .then((result) => {
      for (let i = 0; i < result.data.length; i++){
        console.log(buildings)
        if (containsBuilding(result.data[i], buildings) === false){
          no_duplicates.add({value: result.data[i].UUID, label: result.data[i].Name})
          console.log(result.data[i])
          buildings.push({
            value: result.data[i].UUID,
            label: result.data[i].Name
         })
        }
      }
      //buildings = Array.from(no_duplicates)
    }).catch((err) => {
      console.log(err)
    })
}

// for (let building in result.data) {
//   buildings.push({
//     value: building.UUID,
//     label: building.Name
//   })

const customStyles = {
  indicatorSeparator: styles => ({ ...styles, display: "none" }),
    option: (provided, state) => ({
      ...provided,
    })
}

const StartDropDown = () => {
  //Store starting location selected by user to get ready for to query 
  const [Starting, setStart] = useState('');

  const handleChange = (event) => {
    setStart(event.label);
  }
  return(
    <div> 
      <Select 
      menuPortalTarget={document.body} 
      menuPosition = {'fixed'}
      placeholder = 'Choose Starting Location' 
      onChange = {handleChange}
      options={buildings} />
    </div>
  );
  //<p>{Starting}</p>
}

const EndDropDown = () => {
  //Store destination location selected by user to get ready for query
  const [Ending, setEnd] = useState('');

  const handleChange = (event) => {
    setEnd(event.label);
  }
  return(
    <div> 
      <Select 
      menuPortalTarget={document.body} 
      menuPosition = {'fixed'}
      placeholder = 'Choose Starting Location' 
      onChange = {handleChange}
      options={buildings} />
    </div>
  );
  //<p>{Ending}</p>
}

export default App;
