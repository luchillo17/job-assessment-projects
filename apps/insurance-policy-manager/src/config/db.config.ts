import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { applyUserConstraints } from '../models/user.model';

const options = {};

let clientPromise: Promise<MongoClient>;
let memoryServerPromise: Promise<MongoMemoryServer>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  // This will create an new instance of "MongoMemoryServer" and automatically start it
  global._mongoMemoryServerPromise ??= MongoMemoryServer.create();
  memoryServerPromise = global._mongoMemoryServerPromise;

  global._mongoClientPromise ??= memoryServerPromise.then((memoryServer) =>
    new MongoClient(memoryServer.getUri(), options).connect()
  );

  clientPromise = global._mongoClientPromise;
  clientPromise.then((client) => applyUserConstraints(client));
} else {
  // In production mode, it's best to not use a global variable.

  // This will create an new instance of "MongoMemoryServer" and automatically start it
  memoryServerPromise = MongoMemoryServer.create();

  clientPromise = memoryServerPromise.then((memoryServer) =>
    new MongoClient(memoryServer.getUri(), options).connect()
  );
  clientPromise.then((client) => applyUserConstraints(client));
}

export const mongoMemoryServerPromise = memoryServerPromise;
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export const mongoClientPromise = clientPromise;
