import { DBConfig } from "ngx-indexed-db";

export const dbConfig: DBConfig  = {
    name: 'pwaDB',
    version: 1,
    objectStoresMeta: [{
      store: 'posts',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'image', keypath: 'image', options: { unique: false } },
        { name: 'location', keypath: 'location', options: { unique: false } },
      ]
    }]
  };