import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
      
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log(`
  PUTTING to IndexedDb
  `);

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  console.log(content);
  const request = store.put({id:1, content:content});

  const result = await request;
  console.log('Result Value-------------------');
  console.log(result);
  
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log(`
  Geting from IndexedDb
  `);

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  return result;
};

initdb();