import { getDatabase, ref, update, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASECFG } from './firebase-cfg';

const app = initializeApp(FIREBASECFG);
const db = getDatabase(app);
const auth = getAuth(app);

export default class dataStorage {
  constructor({ queue, watched }) {
    this._queue = queue;
    this._watched = watched;
  }

  get queue() {
    return this._queue;
  }

  set queue(newQueue) {
    this._queue = newQueue;

    onAuthStateChanged(auth, user => {
      if (user) {
        const libDataBase = `users/${user.uid}/lib/queue/`;

        update(ref(db, libDataBase), this._queue);
      }
    });
  }

  get watched() {
    return this._watched;
  }

  set watched(newWatched) {
    this._watched = newWatched;

    onAuthStateChanged(auth, user => {
      if (user) {
        const libDataBase = `users/${user.uid}/lib/watched/`;

        update(ref(db, libDataBase), this._watched);
      }
    });
  }

  delQueue() {
    onAuthStateChanged(auth, user => {
      if (user) {
        const libDataBase = `users/${user.uid}/lib/queue/` + Object.keys(this.queue);

        remove(ref(db, libDataBase));
      }
    });
  }

  delWatched() {
    onAuthStateChanged(auth, user => {
      if (user) {
        const libDataBase = `users/${user.uid}/lib/watched/` + Object.keys(this.watched);

        remove(ref(db, libDataBase));
      }
    });
  }
}
