import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';
import styles from '../CSS/Register.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [addError, setAddError] = useState(null); 

  const [addUser] = useMutation(ADD_USER, {
    onError: (error) => {
      console.error('Error registering user:', error);
      setAddError(error.message); 
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const result = await addUser({
        variables: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      });

      if (result.data && result.data.addUser && result.data.addUser.token) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setAddError(null); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {addError && <div className={styles.error}>{addError}</div>} 
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control className={styles.input} type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control className={styles.input} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control className={styles.select} as="select" name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </Form.Control>
        </Form.Group>
        <Button className={styles.button} variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
