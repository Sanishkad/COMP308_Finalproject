import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_POSSIBLE_CONDITIONS } from '../graphql/queries';
import '../CSS/Condition.css';


const PossibleConditionsPage = () => {
  const userId = localStorage.getItem('userId');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [fetchConditions, { loading, data, error }] = useLazyQuery(GET_POSSIBLE_CONDITIONS, {
    variables: { userId, symptoms: selectedSymptoms },
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSymptoms(checked
      ? [...selectedSymptoms, value]
      : selectedSymptoms.filter((symptom) => symptom !== value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId) {
      console.error('No userId found in localStorage.');
      alert('Your session has expired. Please log in again.');
    } else {
      fetchConditions();
    }
  };

  return (
    <div>
      <h2>Check Possible Medical Conditions</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            value="fever"
            onChange={handleCheckboxChange}
          />
          Fever
        </label>
        <label>
          <input
            type="checkbox"
            value="cough"
            onChange={handleCheckboxChange}
          />
          Cough
        </label>
        <label>
          <input
            type="checkbox"
            value="headache"
            onChange={handleCheckboxChange}
          />
          Headache
        </label>
        <label>
          <input
            type="checkbox"
            value="sneezing"
            onChange={handleCheckboxChange}
          />
          Sneezing
        </label>
        <label>
          <input
            type="checkbox"
            value="shortness_of_breath"
            onChange={handleCheckboxChange}
          />
          Shortness of breath
        </label>
        <label>
          <input
            type="checkbox"
            value="chest_pain"
            onChange={handleCheckboxChange}
          />
          Chest pain
        </label>
        <label>
          <input
            type="checkbox"
            value="Fatigue"
            onChange={handleCheckboxChange}
          />
          Fatigue
        </label>
        <label>
          <input
            type="checkbox"
            value="dizziness"
            onChange={handleCheckboxChange}
          />
          Dizziness
        </label> 
        <label>
          <input
            type="checkbox"
            value="nausea"
            onChange={handleCheckboxChange}
          />
          Nausea
        </label>
        <label>
          <input
            type="checkbox"
            value="loss_of_smell"
            onChange={handleCheckboxChange}
          />
          Loss of smell
        </label>
        <label>
          <input
            type="checkbox"
            value="muscle_ache"
            onChange={handleCheckboxChange}
          />
          Muscle ache
        </label>


        <button type="submit">Submit Symptoms</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.possibleConditions.map((condition, index) => (
            <li key={index}>
              <b>{condition.condition}</b>: {condition.advice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PossibleConditionsPage;
