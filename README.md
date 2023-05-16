<h1 align="center"> Simple Emajohn Project 😀</h1>

***
### My Project Live Demo Please Click 👉 [▶](https://pactise-firebase.web.app/ 'Click For Live Project Demo')
***

# Firebase Setup and Hosting

In this guide, we will walk through setting up Firebase for a web app and hosting the app on Firebase.

## Firebase Setup

### Step 1: Create Firebase Project

Create a new Firebase project by following the [Firebase documentation](https://firebase.google.com/docs/web/setup#create-firebase-project).

### Step 2: Create Web App

Create a web app within the Firebase project by following the [Firebase documentation](https://firebase.google.com/docs/web/setup#create-firebase-project).

### Step 3: Install Firebase

Install Firebase in the project directory by running the command `npm i firebase`.

### Step 4: Export Firebase Config

Save the Firebase config and export the Firebase app for use in the app:

``` javascript
import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
});

export default app;
```

### Step 5: Enable Sign-In Method

In the Firebase Console, navigate to Authentication and enable the sign-in method.

### Step 6: Create Sign-Up and Login Routes

Create sign-up and login routes for the app to allow users to sign up and log in to the app using Firebase Authentication.

## Firebase Hosting

### Step 1: Install Firebase Tools

Install Firebase CLI tools globally on your machine by running the command `npm install -g firebase-tools`.

### Step 2: Log In to Firebase

Log in to Firebase by running the command `firebase login`.

### Step 3: Initialize Firebase Hosting

Initialize Firebase Hosting in the project directory by running the command `firebase init`. Follow the prompts to configure Firebase Hosting.

### Step 4: Build and Deploy

Build the app by running the command `npm run build`. Deploy the app to Firebase Hosting by running the command `firebase deploy`.

Congratulation! Your web app should now be successfully hosted on Firebase.