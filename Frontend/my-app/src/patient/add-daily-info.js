import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DAILY_INFO } from '../graphql/mutations';
import '../CSS/AddDailyInfo.css';


const AddDailyInfo = () => {
  const [formData, setFormData] = useState({
    pulseRate: '',
    bloodPressure: '',
    weight: '',
    temperature: '',
    respiratoryRate: '',
  });

  const [addDailyInfo, { loading, error }] = useMutation(ADD_DAILY_INFO);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
  
    console.log("Submitting the following data:", {
      userId,
      pulseRate: parseInt(formData.pulseRate),
      bloodPressure: formData.bloodPressure,
      weight: parseFloat(formData.weight),
      temperature: parseFloat(formData.temperature),
      respiratoryRate: parseInt(formData.respiratoryRate),
    });
  
    if (!userId || isNaN(formData.pulseRate) || isNaN(formData.weight) || isNaN(formData.temperature) || isNaN(formData.respiratoryRate)) {
      console.error('Invalid form data. Please check your input.');
      return;
    }
  
    addDailyInfo({
      variables: {
        userId,
        pulseRate: parseInt(formData.pulseRate),
        bloodPressure: formData.bloodPressure,
        weight: parseFloat(formData.weight),
        temperature: parseFloat(formData.temperature),
        respiratoryRate: parseInt(formData.respiratoryRate),
      },
    });
  };
  

  return (
    <div>
      <h2>Add Daily Health Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pulseRate">Pulse Rate:</label>
          <input
            id="pulseRate"
            name="pulseRate"
            type="number"
            value={formData.pulseRate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bloodPressure">Blood Pressure:</label>
          <input
            id="bloodPressure"
            name="bloodPressure"
            type="text"
            value={formData.bloodPressure}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="temperature">Temperature:</label>
          <input
            id="temperature"
            name="temperature"
            type="number"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="respiratoryRate">Respiratory Rate:</label>
          <input
            id="respiratoryRate"
            name="respiratoryRate"
            type="number"
            value={formData.respiratoryRate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Daily Info</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.message}</p>}
    </div>
  );
};

export default AddDailyInfo;
