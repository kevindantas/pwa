// Initialize Firebase
var config = {
  apiKey: "AIzaSyBS5dEUkZ3qWErZwYDW_ee7hTNjJiXOmTc",
  authDomain: "senai-firebase.firebaseapp.com",
  databaseURL: "https://senai-firebase.firebaseio.com",
  projectId: "senai-firebase",
  storageBucket: "senai-firebase.appspot.com",
  messagingSenderId: "689924745508"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: 'feed.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
