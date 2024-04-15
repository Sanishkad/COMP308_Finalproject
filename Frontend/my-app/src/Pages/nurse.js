import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/NursePage.css'; 

import addVitalSignsImage from '../assets/addVitalSignsImage.png';
import viewVitalSignsImage from '../assets/viewVitalSignsImage.png';
import possibleConditionsImage from '../assets/possibleConditionsImage.png';

const NursePageNavigation = () => {
  return (
    <div className="nurse-page-navigation">
      <h2>Welcome to the Nurse Page!</h2>
      <p>Here, you can perform various tasks related to patient care.</p>

      <h3>Navigation:</h3>
      <ul>
        <li>
          <Link to="/nurse/add">
            <img src={addVitalSignsImage} alt="Add Vital Signs" />
            <span>Add Vital Signs</span>
          </Link>
          <p>Add vital signs such as body temperature, heart rate, blood pressure, and respiratory rate.</p>
        </li>
        <li>
          <Link to="/nurse/view">
            <img src={viewVitalSignsImage} alt="View Vital Signs" />
            <span>View Vital Signs</span>
          </Link>
          <p>View previously recorded vital signs for patients.</p>
        </li>
        <li>
          <Link to="/nurse/conditions">
            <img src={possibleConditionsImage} alt="Possible Conditions" />
            <span>Possible Conditions</span>
          </Link>
          <p>Generate a list of possible medical conditions based on symptoms and provide advice to patients.</p>
        </li>
      </ul>
    </div>
  );
};

export default NursePageNavigation;
