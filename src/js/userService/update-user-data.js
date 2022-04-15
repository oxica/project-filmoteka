// import { refs } from '../refs';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { FIREBASECFG } from './firebase-cfg';
// import { initializeApp } from 'firebase/app';

// const app = initializeApp(FIREBASECFG);
// const auth = getAuth(app);
// import User from './user';

// onAuthStateChanged(auth, user => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User

//     // document.getElementById('userDisplayedName').textContent = `${user.displayName}`;
//     // document
//     //   .getElementById('userDisplayedName')
//     //   .setAttribute('href', './partial/user-page.html');

//     console.log(user.displayName);
//     console.log(refs.logInForm);
//     // ...
//   } else {
//     // User is signed out
//     document.getElementById('userDisplayedName').textContent = `Guest`;
//     document
//       .getElementById('userDisplayedName')
//       .setAttribute('href', './partial/register-page.html');
//     // ...
//   }
//   // return user.displayName;
// });
