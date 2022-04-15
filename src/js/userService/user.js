import { getDatabase, ref, set, get, remove, onValue, child } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASECFG } from './firebase-cfg';

const app = initializeApp(FIREBASECFG);
const db = getDatabase(app);
const auth = getAuth(app);

export default class User {
  constructor(userData) {
    this.userData = userData;
  }

  create() {
    createUserWithEmailAndPassword(auth, this.userData.auth.email, this.userData.auth.password)
      .then(userCredential => {
        const user = userCredential.user;

        set(ref(db, 'users/' + user.uid), this.userData);

        updateProfile(auth.currentUser, {
          displayName: `${this.userData.auth.userName}`,
        })
          .then(() => {
            alert(`User ${this.userData.auth.userName} created`);
          })
          .catch(error => {
            console.log(error);
          });

        signOut(auth)
          .then(() => {})
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error.code);
      });
  }

  logIn() {
    const user = auth.currentUser;

    if (user) {
      alert('You are already signed in');
      return;
    }

    if (!this.userData.email || !this.userData.password) {
      alert('Please enter your email and password');
      return;
    }

    signInWithEmailAndPassword(auth, this.userData.email, this.userData.password)
      .then(userCredential => {
        const user = userCredential.user;

        alert(`User ${user.displayName} signed in`);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
      });
  }

  getUserName() {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user.displayName);
        return (this._user = user.displayName);
        const uid = user.uid;
      } else {
        document.getElementById('userDisplayedName').textContent = `Guest`;
        document
          .getElementById('userDisplayedName')
          .setAttribute('href', './partial/register-page.html');
      }
    });
  }

  logOut() {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    signOut(auth)
      .then(() => {
        alert('You are logged out');
      })
      .then(() => {})
      .catch(error => {});
  }

  updateUser() {}

  removeUser() {
    const user = auth.currentUser;

    if (!user) {
      alert('Please sign in');
      return;
    }

    deleteUser(user)
      .then(() => {
        remove(ref(db, 'users/' + user.uid));

        alert(`User ${user.displayName} deleted`);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
