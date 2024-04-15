import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/PatientPage.css';

import addDailyInfoImage from '../assets/addDailyInfoImage.png';
import symptomChecklistImage from '../assets/symptomChecklistImage.png';
import fitnessGamesImage from '../assets/fitnessGamesImage.png';

const PatientPageNavigation = () => {
  return (
    <div className="patient-page-navigation">
      <h2>Welcome to the Patient Page!</h2>
      <p>Here, you can monitor your health and stay engaged with daily activities.</p>

      <h3>Navigation:</h3>
      <ul>
        <li>
          <Link to="/patient/add-daily-info">
            <img src={addDailyInfoImage} alt="Add Daily Information" />
            <span>Add Daily Information</span>
          </Link>
          <p>Enter daily health information like pulse rate, blood pressure, weight, temperature, and respiratory rate.</p>
        </li>
        <li>
          <Link to="/patient/symptoms-checklist">
            <img src={symptomChecklistImage} alt="Symptoms Checklist" />
            <span>Symptoms Checklist</span>
          </Link>
          <p>Use a checklist to report common signs and symptoms, such as those related to COVID-19.</p>
        </li>
        <li>
          <a href="https://princepatel.ca/games/vital-care.html" target="_blank" rel="noopener noreferrer">
            <img src={fitnessGamesImage} alt="Fitness Games" />
            <span>Fitness Games</span>
          </a>
          <p>Access fitness games designed to encourage exercising at home.</p>
        </li>
      </ul>
    </div>
  );
};

export default PatientPageNavigation;
