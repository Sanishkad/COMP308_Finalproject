import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Homepage';
import RegisterPage from './Pages/register';
import LoginPage from './Pages/login';
import NursePage from './Pages/nurse';
import AddVitalSignsPage from './nurse/add';
import ViewVitalSignsPage from './nurse/view';

import PossibleConditionsPage from './nurse/conditions';
import PatientPage from './Pages/patient';
import AddDailyInfoPage from './patient/add-daily-info'; 
import SymptomsChecklistPage from './patient/symptoms-checklist'; 

const client = new ApolloClient({
  uri: 'https://comp308-finalproject-backend.onrender.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nurse" element={<NursePage />} />
          <Route path="/nurse/add" element={<AddVitalSignsPage />} />
          <Route path="/nurse/view" element={<ViewVitalSignsPage />} />
          <Route path="/nurse/conditions" element={<PossibleConditionsPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/patient/add-daily-info" element={<AddDailyInfoPage />} />
          <Route path="/patient/symptoms-checklist" element={<SymptomsChecklistPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
