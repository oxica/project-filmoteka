import { refs } from '../refs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASECFG } from './firebase-cfg';
import { initializeApp } from 'firebase/app';
import User from './user';

const app = initializeApp(FIREBASECFG);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  const updFormHeader = document.getElementById('upd-form-header');
  if (user) {
    updFormHeader.textContent = `Hello ${user.displayName}`;
    return;
  }

  updFormHeader.textContent = `Hello`;
});

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

  refs.chName.removeAttribute('disabled');
  refs.chEmail.removeAttribute('disabled');
  refs.chPswd.removeAttribute('disabled');

  refs.body.removeAttribute('style');
  refs.modalAuth.classList.toggle('visibility');
}

function onLogInUser(e) {
  e.preventDefault();

  const signUpEmail = document.getElementById('logInEmail').value;
  const signUpPswd = document.getElementById('logInPswd').value;

  const userData = {
    email: signUpEmail,
    pswd: signUpPswd,
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

  refs.modalAuth.classList.toggle('visibility');
  refs.body.removeAttribute('style');
}

function onCreateUser(e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('pswd').value,
  };

  const user = new User(userData);

  user.create();

  e.currentTarget.reset();

  onCloseModalAuth(e);
}

function onUpdateUser(e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById('change-name').value,
    email: document.getElementById('change-email').value,
    pswd: document.getElementById('change-pswd').value,
  };

  const user = new User(userData);

  user.updateUser();

  e.currentTarget.reset();

  onCloseModalAuth(e);
}

function onInput(e) {
  e.preventDefault();

  if (e.target.name === 'name' && e.target.value) {
    refs.chEmail.setAttribute('disabled', '');
    refs.chPswd.setAttribute('disabled', '');
    return;
  }

  refs.chEmail.removeAttribute('disabled');
  refs.chPswd.removeAttribute('disabled');

  if (e.target.name === 'email' && e.target.value) {
    refs.chName.setAttribute('disabled', '');
    refs.chPswd.setAttribute('disabled', '');
    return;
  }

  refs.chName.removeAttribute('disabled');
  refs.chPswd.removeAttribute('disabled');

  if (e.target.name === 'password' && e.target.value) {
    refs.chName.setAttribute('disabled', '');
    refs.chEmail.setAttribute('disabled', '');
    return;
  }

  refs.chName.removeAttribute('disabled');
  refs.chEmail.removeAttribute('disabled');

  e.currentTarget.reset();
}

function onEscape(e) {
  if (e.code === 'Escape') {
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

    refs.chName.removeAttribute('disabled');
    refs.chEmail.removeAttribute('disabled');
    refs.chPswd.removeAttribute('disabled');

    refs.body.removeAttribute('style');
    refs.modalAuth.classList.toggle('visibility');
  }
}

refs.userAuth.addEventListener('click', onOpenModalAuth);
refs.regForm.addEventListener('submit', onCreateUser);
refs.modalAuth.addEventListener('click', onCloseModalAuth);
document.addEventListener('keydown', onEscape);
refs.updForm.addEventListener('submit', onUpdateUser);
refs.updForm.addEventListener('input', onInput);
