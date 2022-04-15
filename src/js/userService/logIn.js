import { refs } from '../refs';
import { getAuth } from 'firebase/auth';
import { FIREBASECFG } from './firebase-cfg';
import { initializeApp } from 'firebase/app';
import User from './user';

const app = initializeApp(FIREBASECFG);
const auth = getAuth(app);

function onChangeTab() {
  refs.logInTab.classList.toggle('auth-headers-list-item-inactive');
  refs.logInForm.classList.toggle('visibility');
  refs.regTab.classList.toggle('auth-headers-list-item-inactive');
  refs.regForm.classList.toggle('visibility');
}

function onChangeUserSetTab() {
  refs.settingsTab.classList.toggle('auth-headers-list-item-inactive');
  refs.updForm.classList.toggle('visibility');
  refs.delAccTab.classList.toggle('auth-headers-list-item-inactive');
  refs.confDelAcc.classList.toggle('visibility');
  refs.delAccBtn.classList.toggle('visibility');
}

function onOpenModalAuth() {
  const user = auth.currentUser;

  if (user) {
    refs.modalAuth.classList.toggle('visibility');

    refs.userSetPage.classList.remove('visibility');
    refs.updForm.classList.remove('visibility');

    refs.settingsTab.addEventListener('click', onChangeUserSetTab);
    refs.delAccTab.addEventListener('click', onChangeUserSetTab);

    refs.regForm.addEventListener('submit', onCreateUser);

    refs.logOutBtn.addEventListener('click', onLogOut);
    refs.delAccBtnYes.addEventListener('click', onUserRemove);
    refs.delAccBtnYes.addEventListener('click', onCloseModalAuth);
    refs.delAccBtnNo.addEventListener('click', onCloseModalAuth);
  } else {
    refs.modalAuth.classList.toggle('visibility');

    refs.logInPage.classList.remove('visibility');
    refs.logInForm.classList.remove('visibility');
    refs.logInTab.addEventListener('click', onChangeTab);
    refs.regTab.addEventListener('click', onChangeTab);

    refs.logInForm.addEventListener('submit', onLogInUser);
  }

  refs.body.setAttribute('style', 'overflow: hidden');
}

function onCloseModalAuth(e) {
  if (e.target !== e.currentTarget) {
    e.stopPropagation();
    return;
  }

  refs.logInPage.classList.add('visibility');
  refs.logInTab.classList.remove('auth-headers-list-item-inactive');
  refs.logInForm.classList.add('visibility');
  refs.regTab.classList.add('auth-headers-list-item-inactive');
  refs.regForm.classList.add('visibility');

  refs.settingsTab.classList.remove('auth-headers-list-item-inactive');
  refs.userSetPage.classList.add('visibility');
  refs.updForm.classList.add('visibility');
  refs.delAccTab.classList.add('auth-headers-list-item-inactive');
  refs.confDelAcc.classList.add('visibility');
  refs.delAccBtn.classList.add('visibility');

  refs.body.removeAttribute('style');
  refs.modalAuth.classList.toggle('visibility');
}

function onLogInUser(e) {
  e.preventDefault();

  const signUpEmail = document.getElementById('logInEmail').value;
  const signUpPswd = document.getElementById('logInPswd').value;

  const userData = {
    email: signUpEmail,
    password: signUpPswd,
  };

  const user = new User(userData);

  user.logIn();

  e.currentTarget.reset();

  onCloseModalAuth(e);
}

function onLogOut(e) {
  const user = new User();

  user.logOut();

  onCloseModalAuth(e);
}

function onUserRemove(e) {
  e.preventDefault();

  const user = new User();

  user.removeUser();

  onCloseModalAuth(e);

  refs.settingsTab.classList.remove('auth-headers-list-item-inactive');
  refs.userSetPage.classList.add('visibility');
  refs.updForm.classList.add('visibility');
  refs.delAccTab.classList.add('auth-headers-list-item-inactive');
  refs.confDelAcc.classList.add('visibility');
  refs.delAccBtn.classList.add('visibility');

  refs.modalAuth.classList.toggle('visibility');
  refs.body.removeAttribute('style');
}

function onCreateUser(e) {
  e.preventDefault();

  const signUpName = document.getElementById('name').value;
  const signUpEmail = document.getElementById('email').value;
  const signUpPswd = document.getElementById('pswd').value;

  const userData = {
    auth: {
      userName: signUpName,
      email: signUpEmail,
      password: signUpPswd,
    },
  };

  const user = new User(userData);

  user.create();

  e.currentTarget.reset();

  onCloseModalAuth(e);
}

refs.userAuth.addEventListener('click', onOpenModalAuth);
refs.regForm.addEventListener('submit', onCreateUser);
refs.modalAuth.addEventListener('click', onCloseModalAuth);
