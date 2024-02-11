import { MongoClient } from 'mongodb';

export interface User {
  username: string;
  password: string;
}

export async function applyUserConstraints(client: MongoClient) {
  const userCollection = client.db().collection<User>('User');
  await userCollection.createIndex({ username: 1 }, { unique: true });
}
