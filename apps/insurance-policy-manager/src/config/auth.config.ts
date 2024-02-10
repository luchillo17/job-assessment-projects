import { ExpressAuth } from '@auth/express';
// import Credentials from '@auth/express/providers/credentials';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';

// import { mongoClientPromise } from './db.config';

export const authMiddleware = ExpressAuth({
  providers: [
    // Credentials({
    //   name: 'Insurance Policy Manager',
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'JSmith' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, request) {
    //     console.log('Credentials: ', credentials);
    //     console.log('Request: ', request);
    //     const response = await fetch(request);
    //     if (!response.ok) return null;
    //     return (await response.json()) ?? null;
    //   },
    // }),
  ],
  // adapter: MongoDBAdapter(mongoClientPromise),
});
