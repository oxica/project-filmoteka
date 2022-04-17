import { refs } from '../refs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASECFG } from './firebase-cfg';
import { initializeApp } from 'firebase/app';
import User from './user';

const app = initializeApp(FIREBASECFG);
const auth = getAuth(app);

function onChangeTab() {
  refs.logInTab.classList.toggle('top-left');
  refs.logInForm.classList.toggle('hidden-tab');
  refs.regTab.classList.toggle('top-right');
  refs.regForm.classList.toggle('hidden-tab');
}

function onChangeUserSetTab() {
  refs.settingsTab.classList.toggle('top-left');
  refs.updForm.classList.toggle('hidden-tab');
  refs.delAccTab.classList.toggle('top-right');
  refs.confDelAcc.classList.toggle('hidden-tab');
  refs.delAccBtn.classList.toggle('hidden-tab');
}

function onOpenModalAuth() {
  refs.modalAuth.classList.toggle('visibility');

  const user = auth.currentUser;

  if (user) {
    refs.userSetPage.classList.remove('hidden-tab');
    refs.settingsTab.classList.remove('hidden-tab');
    refs.updForm.classList.remove('hidden-tab');
    refs.delAccTab.classList.remove('hidden-tab');

    refs.settingsTab.addEventListener('click', onChangeUserSetTab);
    refs.delAccTab.addEventListener('click', onChangeUserSetTab);
    refs.logOutBtn.addEventListener('click', onLogOut);

    refs.delAccBtnYes.addEventListener('click', onUserRemove);
    refs.delAccBtnYes.addEventListener('click', onCloseModalAuth);
    refs.delAccBtnNo.addEventListener('click', onCloseModalAuth);
  } else {
    refs.logInPage.classList.remove('hidden-tab');
    refs.logInTab.classList.remove('hidden-tab');
    refs.logInForm.classList.remove('hidden-tab');
    refs.regTab.classList.remove('hidden-tab');

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

  refs.logInPage.classList.add('hidden-tab');
  refs.logInTab.classList.add('hidden-tab');
  refs.logInTab.classList.remove('top-left');
  refs.logInForm.classList.add('hidden-tab');
  refs.regTab.classList.add('hidden-tab');
  refs.regTab.classList.add('top-right');
  refs.regForm.classList.add('hidden-tab');

  refs.userSetPage.classList.add('hidden-tab');
  refs.settingsTab.classList.add('hidden-tab');
  refs.settingsTab.classList.remove('top-left');
  refs.updForm.classList.add('hidden-tab');
  refs.delAccTab.classList.add('hidden-tab');
  refs.delAccTab.classList.add('top-right');
  refs.confDelAcc.classList.add('hidden-tab');
  refs.delAccBtn.classList.add('hidden-tab');

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
    refs.logInPage.classList.add('hidden-tab');
    refs.logInTab.classList.add('hidden-tab');
    refs.logInTab.classList.remove('top-left');
    refs.logInForm.classList.add('hidden-tab');
    refs.regTab.classList.add('hidden-tab');
    refs.regTab.classList.add('top-right');
    refs.regForm.classList.add('hidden-tab');

    refs.userSetPage.classList.add('hidden-tab');
    refs.settingsTab.classList.add('hidden-tab');
    refs.settingsTab.classList.remove('top-left');
    refs.updForm.classList.add('hidden-tab');
    refs.delAccTab.classList.add('hidden-tab');
    refs.delAccTab.classList.add('top-right');
    refs.confDelAcc.classList.add('hidden-tab');
    refs.delAccBtn.classList.add('hidden-tab');

    refs.chName.removeAttribute('disabled');
    refs.chEmail.removeAttribute('disabled');
    refs.chPswd.removeAttribute('disabled');

    refs.body.removeAttribute('style');
    refs.modalAuth.classList.add('visibility');
  }
}

refs.userAuth.addEventListener('click', onOpenModalAuth);
refs.regForm.addEventListener('submit', onCreateUser);
refs.modalAuth.addEventListener('click', onCloseModalAuth);
document.addEventListener('keydown', onEscape);
refs.updForm.addEventListener('submit', onUpdateUser);
refs.updForm.addEventListener('input', onInput);
