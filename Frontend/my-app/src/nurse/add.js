import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_VITAL_SIGNS } from '../graphql/mutations';
import '../CSS/AddVital.css';




const AddVital = () => {

  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    bodyTemperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
  });

  console.log("User ID: ", userId);
  const [addVitalSigns, { error }] = useMutation(ADD_VITAL_SIGNS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('No userId provided for addVitalSigns mutation.');
      return;
    }

    try {
      if (!formData.bodyTemperature || !formData.heartRate || !formData.bloodPressure || !formData.respiratoryRate) {
        throw new Error('Please fill in all fields.');
      }

      console.log("Submitting with userId:", userId);
      console.log("Form data:", formData);

      await addVitalSigns({
        variables: {
          userId, 
          bodyTemperature: parseFloat(formData.bodyTemperature),
          heartRate: parseInt(formData.heartRate, 10),
          bloodPressure: formData.bloodPressure,
          respiratoryRate: parseInt(formData.respiratoryRate, 10),
        },
      });

      setFormData({
        bodyTemperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
      });

      console.log('Vital signs added successfully!');
      alert('Vital signs added successfully!');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-vital-container">
      <h2>Add Vital Signs</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bodyTemperature">Body Temperature:</label>
          <input
            type="number"
            id="bodyTemperature"
            name="bodyTemperature"
            value={formData.bodyTemperature}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="heartRate">Heart Rate:</label>
          <input
            type="number"
            id="heartRate"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodPressure">Blood Pressure:</label>
          <input
            type="text"
            id="bloodPressure"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="respiratoryRate">Respiratory Rate:</label>
          <input
            type="number"
            id="respiratoryRate"
            name="respiratoryRate"
            value={formData.respiratoryRate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddVital;
