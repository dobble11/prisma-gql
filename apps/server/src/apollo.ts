import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './schema';
import { CORS_ALLOWED_ORIGINS, SERVER_PORT } from './shared/constants';
import { logger } from './shared/logger';
import { createContext } from './resolvers/context';

export async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
  });

  await apolloServer.start();

  app.use(
    '/',
    cors({
      credentials: true,
      origin: CORS_ALLOWED_ORIGINS,
    }),
    bodyParser.json(),
  );
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: createContext,
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));

  logger.info(`🚀 Server ready at http://localhost:${SERVER_PORT}/graphql`);
}
