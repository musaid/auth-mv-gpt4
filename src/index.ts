import dotenv from 'dotenv';
dotenv.config();

import { createTRPCServer } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/http';
import { createContext } from './middleware/context';
import { appRouter } from './router';

const server = createTRPCServer({
  router: appRouter,
  createContext,
});

const httpServer = createHTTPServer({ server });

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
