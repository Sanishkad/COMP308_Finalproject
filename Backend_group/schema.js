const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');
const User = require('./model/User');
const VitalSigns = require('./model/VitalSigns'); 
const SymptomChecklist = require('./model/SymptomChecklist'); 
const PatientDailyInfo = require('./model/PatientDailyInfo');

const PatientDailyInfoType = new GraphQLObjectType({
  name: 'PatientDailyInfo',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    pulseRate: { type: GraphQLInt },
    bloodPressure: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    temperature: { type: GraphQLFloat },
    respiratoryRate: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    token: { type: GraphQLString }, 
  }),
});

const VitalSignsType = new GraphQLObjectType({
  name: 'VitalSigns',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    bodyTemperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLInt },
    bloodPressure: { type: GraphQLString }, 
    respiratoryRate: { type: GraphQLInt },
    createdAt: { type: GraphQLString }, 
  }),
});


const SymptomChecklistType = new GraphQLObjectType({
  name: 'SymptomChecklist',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    symptoms: { type: new GraphQLList(GraphQLString) }, 
    submittedAt: { type: GraphQLString }, 
  }),
});



const ConditionType = new GraphQLObjectType({
  name: 'Condition',
  fields: () => ({
    condition: { type: GraphQLString },
    advice: { type: GraphQLString },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error('Email already in use');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.password, salt);
        const newUser = new User({
          email: args.email,
          password: hashedPassword,
          role: args.role,
        });
        const result = await newUser.save();
        const token = jwt.sign({ id: result.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return { ...result._doc, id: result._doc._id, token };
      },
    },
    loginUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error('User not found');
        }
        const validPass = await bcrypt.compare(args.password, user.password);
        if (!validPass) {
          throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return { user, token };
      },
    },
    loginUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const user = await User.findOne({ email: args.email });
          if (!user) {
            throw new Error('User not found');
          }
          const validPass = await bcrypt.compare(args.password, user.password);
          if (!validPass) {
            throw new Error('Invalid password');
          }
          const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
          return { ...user._doc, id: user._doc._id, token };
        } catch (error) {
          console.error(error);
          throw new Error('Error logging in');
        }
      },
    },
    addVitalSigns: {
      type: VitalSignsType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLInt },
        bloodPressure: { type: GraphQLString },
        respiratoryRate: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const user = await User.findById(args.userId);
        
        if (!user) {
          throw new Error('User not found.');
        } else if (user.role !== 'nurse') {
          throw new Error('Only users with the role of nurse can add vital signs.');
        }
        
        const newVitalSigns = new VitalSigns({
          userId: args.userId,
          bodyTemperature: args.bodyTemperature,
          heartRate: args.heartRate,
          bloodPressure: args.bloodPressure,
          respiratoryRate: args.respiratoryRate,
          createdAt: new Date().toISOString(),
        });
        
        return await newVitalSigns.save();
      },
    },
    addDailyInfo: {
      type: PatientDailyInfoType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        pulseRate: { type: GraphQLInt },
        bloodPressure: { type: GraphQLString },
        weight: { type: GraphQLFloat },
        temperature: { type: GraphQLFloat },
        respiratoryRate: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const user = await User.findById(args.userId);
        if (!user) {
          throw new Error('User not found.');
        } else if (user.role !== 'patient') {
          throw new Error('Only users with the role of patient can add daily information.');
        }
    
        const newDailyInfo = new PatientDailyInfo({
          ...args,
          createdAt: new Date().toISOString(),
        });
    
        return await newDailyInfo.save();
      },
    },
    submitSymptoms: {
      type: SymptomChecklistType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        symptoms: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve: async (parent, { userId, symptoms }) => {
        const user = await User.findById(userId);
        
        if (!user) {
          throw new Error('User not found.');
        } else if (user.role !== 'patient') {
          throw new Error('Only users with the role of patient can submit symptoms.');
        }
                const newSymptomSubmission = new SymptomChecklist({
          userId,
          symptoms,
          submittedAt: new Date(),
        });
    
        return await newSymptomSubmission.save();
      },
    },    
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    vitalSigns: {
      type: new GraphQLList(VitalSignsType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, { userId }) => {
        const user = await User.findById(userId);
        if (!user || user.role !== 'nurse') {
          throw new Error('Only users with the role of nurse can access vital signs.');
        }
        
        return VitalSigns.find({ userId });
      },
    },
    possibleConditions: {
      type: new GraphQLList(ConditionType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        symptoms: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve: async (parent, { userId, symptoms }) => {
        const user = await User.findById(userId);
        if (!user || user.role !== 'nurse') {
          throw new Error('Only users with the role of nurse can access possible conditions.');
        }

          const conditionsMap = {
            fever: { condition: "Common Cold", advice: "Please visit a doctor if the condition persists for more than 3 days." },
            cough: { condition: "Common Cold", advice: "Stay hydrated and rest." },
            headache: { condition: "Migraine", advice: "Consult a doctor if the headache is severe." },
    sneezing: { condition: "Allergy", advice: "Consider allergy testing if sneezing is frequent and severe." },
    shortness_of_breath: { condition: "Asthma or COVID-19", advice: "Urgent medical evaluation is recommended." },
    chest_pain: { condition: "Possible cardiac issue", advice: "Seek immediate medical attention." },
    fatigue: { condition: "Fatigue due to various causes", advice: "A thorough check-up is advised if this persists." },
    dizziness: { condition: "May be dehydration or low blood pressure", advice: "Ensure proper hydration and consult a doctor if symptoms persist." },
    nausea: { condition: "Gastrointestinal disturbance", advice: "Rest and drink fluids. Seek medical advice if it worsens or does not improve." },
    loss_of_smell: { condition: "COVID-19 or sinus issues", advice: "Isolate and seek COVID-19 testing, and consult a healthcare provider." },
    muscle_ache: { condition: "Flu or physical overexertion", advice: "Rest, hydrate, and consult a doctor if there's no improvement or if it's severe." },
          };

        const possibleConditions = symptoms.map(symptom => conditionsMap[symptom]).filter(Boolean);

        if (!possibleConditions.length) {
          return [{ condition: "Unknown", advice: "Consult a doctor." }];
        }

        return possibleConditions;
      },
    },
    
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
