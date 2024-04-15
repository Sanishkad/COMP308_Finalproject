import { gql } from '@apollo/client';

export const GET_VITAL_SIGNS = gql`
  query GetVitalSigns($userId: ID!) {
    vitalSigns(userId: $userId) {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;
export const GET_PATIENT_INFO = gql`
  query GetPatientInfo($userId: ID!) {
    patientInfo(userId: $userId) {
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

export const GET_POSSIBLE_CONDITIONS = gql`
  query GetPossibleConditions($userId: ID!, $symptoms: [String!]!) {
    possibleConditions(userId: $userId, symptoms: $symptoms) {
      condition
      advice
    }
  }
`;