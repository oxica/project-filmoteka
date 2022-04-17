import { refs } from '../refs';
import { getDatabase, ref, set, remove } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
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
    createUserWithEmailAndPassword(auth, this.userData.email, this.userData.password)
      .then(userCredential => {
        const user = userCredential.user;

        set(ref(db, 'users/' + user.uid + '/auth/'), this.userData);

        updateProfile(auth.currentUser, {
          displayName: `${this.userData.name}`,
        });

        alert(`User ${this.userData.name} created`);

        signOut(auth).then(() => {
          refs.userLibrary.classList.add('hidden-tab');
        });
      })
      .catch(error => {
        alert(error.code);
      });
  }

  logIn() {
    const user = auth.currentUser;

    if (!this.userData.email || !this.userData.pswd) {
      alert('Please enter your email and password');
      return;
    }

    signInWithEmailAndPassword(auth, this.userData.email, this.userData.pswd)
      .then(userCredential => {
        const user = userCredential.user;

        refs.userLibrary.classList.remove('hidden-tab');

        alert(`User ${user.displayName} signed in`);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  updateUser() {
    const user = auth.currentUser;
    const authDataBase = `users/${user.uid}/auth/`;

    if (this.userData.name) {
      updateProfile(auth.currentUser, {
        displayName: `${this.userData.name}`,
      });

      set(ref(db, authDataBase + 'name'), this.userData.name);

      alert(`User name updated`);
    }

    if (this.userData.email) {
      updateEmail(auth.currentUser, `${this.userData.email}`);

      set(ref(db, authDataBase + 'email'), this.userData.email);

      alert(`Email updated`);
    }

    if (this.userData.pswd) {
      const user = auth.currentUser;

      updatePassword(user, `${this.userData.pswd}`);

      set(ref(db, authDataBase + 'password'), this.userData.pswd);

      alert(`Password updated`);
    }
  }

  logOut() {
    const user = auth.currentUser;

    signOut(auth).then(() => {
      refs.userLibrary.classList.add('hidden-tab');

      location.reload();
    });

    alert('You are logged out');
  }

  removeUser() {
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      refs.userLibrary.classList.add('hidden-tab');

      remove(ref(db, 'users/' + user.uid)).then(() => {
        location.reload();
      });
    });

    alert(`User ${user.displayName} deleted`);
  }
}
