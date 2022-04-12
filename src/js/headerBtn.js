class Tabs {
  constructor({
    rootSelector,
    activeControlClass = 'active',
    activePaneClass = 'active',
    activeTab = 1,
  }) {
    this._refs = this._getRefs(rootSelector);
    this._activeControlClass = activeControlClass;
    this._activePaneClass = activePaneClass;
    this._activeTabIdx = activeTab - 1;

    this._bindEvents();
    this._setActiveTab();
  }

  _getRefs(root) {
    const refs = {};

    refs.controlsLink = document.querySelector(`${root} [data-controls]`);
    refs.panes = document.querySelector(`${root} [data-panes]`);
    return refs;
  }

  _bindEvents() {
    this._refs.controlsLink.addEventListener('click', this._onControlsClick.bind(this));
  }

  _onControlsClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'A') {
      return;
    }

    const currentActiveControlItem = this._refs.controlsLink.querySelector(
      `.${this._activeControlClass}`,
    );

    if (currentActiveControlItem) {
      currentActiveControlItem.classList.remove(this._activeControlClass);
      const paneId = this._getPaneId(currentActiveControlItem);
      this._removeActivePane(paneId);
    }

    const controlItem = event.target;
    controlItem.classList.add(this._activeControlClass);
    const paneId = this._getPaneId(controlItem);
    this._setActivePane(paneId);
  }

  _setActiveTab() {
    const controlItem = this._refs.controlsLink.querySelectorAll('a');
    const control = controlItem[this._activeTabIdx];

    control.classList.add(this._activeControlClass);

    const paneId = this._getPaneId(control);
    this._setActivePane(paneId);
  }

  _setActivePane(paneId) {
    const pane = this._getPaneById(paneId);
    pane.classList.add(this._activePaneClass);
  }

  _removeActivePane(paneId) {
    const pane = this._getPaneById(paneId);
    pane.classList.remove(this._activePaneClass);
  }

  _getPaneId(control) {
    return control.getAttribute('href').slice(1);
  }

  _getPaneById(id) {
    return this._refs.panes.querySelector(`#${id}`);
  }
}

const tabs1 = new Tabs({
  rootSelector: '#tabs-1',
  activeControlClass: 'current',
  activePaneClass: 'pane--active',
  activeTab: 1,
});

/* Функція Зміни зображення Бібліотеки  */
const refs = {
  homeLink: document.querySelector('.btn1'),
  libraryLink: document.querySelector('.btn2'),
  bacgraundIg: document.querySelector('.header'),
};
refs.homeLink.addEventListener('click', homeImg);
refs.libraryLink.addEventListener('click', libraryImg);

function libraryImg(event) {
  event.preventDefault();
  const library = event.target;
  refs.bacgraundIg.classList.add('library');
  if (library) {
    refs.bacgraundIg.classList.remove('home');
  }
}
function homeImg(event) {
  event.preventDefault();
  const home = event.target;
  refs.bacgraundIg.classList.remove('library');
  if (home) {
    refs.bacgraundIg.classList.add('home');
  }
}
