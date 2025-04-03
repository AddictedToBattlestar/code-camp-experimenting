import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import { getAuth } from "firebase/auth";
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

console.log('Setting up Firebase database');

// Initialize Firebase
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;