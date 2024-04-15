import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SUBMIT_SYMPTOMS } from '../graphql/mutations';
import '../CSS/SymptomsChecklist.css';


const SymptomsChecklist = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [submitSymptomsMutation, { data, loading, error }] = useMutation(SUBMIT_SYMPTOMS);

  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (data) {
      console.log('Symptoms submitted successfully:', data);
 
    }
  }, [data]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSymptoms(prev => 
      checked ? [...prev, name] : prev.filter(symptom => symptom !== name)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitSymptomsMutation({ variables: { userId, symptoms: selectedSymptoms } });
  };

  const symptomsOptions = [
    'fever', 'cough', 'tiredness', 'loss_of_taste_or_smell', 
    'difficulty_breathing', 'muscle_or_body_aches', 'headache', 
    'sore_throat', 'congestion_or_runny_nose', 'nausea_or_vomiting', 
    'diarrhea'
  ];

  return (
    <div>
      <h2>COVID-19 Symptoms Checklist</h2>
      <form onSubmit={handleSubmit}>
        {symptomsOptions.map(symptom => (
          <div key={symptom}>
            <label>
              <input
                type="checkbox"
                name={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={handleCheckboxChange}
              />
              {symptom.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Symptoms'}
        </button>
      </form>
      {error && <p>Error submitting symptoms: {error.message}</p>}
    </div>
  );
};

export default SymptomsChecklist;