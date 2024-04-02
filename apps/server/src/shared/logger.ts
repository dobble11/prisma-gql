import pino from 'pino';

export const logger = pino({
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
  transport: {
    targets: [
      {
        level: 'trace',
        target: 'pino-pretty',
        options: {
          translateTime: 'yyyy-mm-dd HH:MM:ss p',
          minimumLevel: 'trace',
        },
      },
    ],
  },
});

export enum LogKey {
  // auth
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ILLEGAL_OPERATION = 'ILLEGAL_OPERATION',
}
