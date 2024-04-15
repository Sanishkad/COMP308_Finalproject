import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!, $role: String!) {
    addUser(email: $email, password: $password, role: $role) {
      id
      email
      role
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      role
      token
    }
  }
`;
export const ADD_VITAL_SIGNS = gql`
  mutation AddVitalSigns($userId: ID!, $bodyTemperature: Float!, $heartRate: Int!, $bloodPressure: String!, $respiratoryRate: Int!) {
    addVitalSigns(userId: $userId, bodyTemperature: $bodyTemperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      id
      userId
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;
export const ADD_DAILY_INFO = gql`
  mutation AddDailyInfo($userId: ID!, $pulseRate: Int!, $bloodPressure: String!, $weight: Float!, $temperature: Float!, $respiratoryRate: Int!) {
    addDailyInfo(userId: $userId, pulseRate: $pulseRate, bloodPressure: $bloodPressure, weight: $weight, temperature: $temperature, respiratoryRate: $respiratoryRate) {
      id
      pulseRate
      bloodPressure
      weight
      temperature
      respiratoryRate
      createdAt
    }
  }
`;

export const SUBMIT_SYMPTOMS = gql`
  mutation SubmitSymptoms($userId: ID!, $symptoms: [String!]!) {
    submitSymptoms(userId: $userId, symptoms: $symptoms) {
      id
      symptoms
      submittedAt
    }
  }
`;