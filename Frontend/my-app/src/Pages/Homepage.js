import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; 
import logo from '../assets/hospital.png'; 
import '../CSS/Home.css'; 

const HomePage = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <span style={{ margin: '0 10px' }}>|</span>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="mt-3">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" height="100" />
        </div>
        <h1 className="title">Welcome to Nurse-Patient Monitoring App</h1>
        <p className="description">
          This application helps nurse practitioners to monitor patients during the first weeks of their release from the hospital and also helps the patients to monitor their daily activities.
        </p>
        <Button as={Link} to="/login" className="button">Get Started</Button>
      </Container>
    </div>
  );
};

export default HomePage;
