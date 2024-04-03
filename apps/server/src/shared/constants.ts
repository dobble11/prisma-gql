export const isProduction = process.env.NODE_ENV === 'production';
export const SERVER_PORT = process.env['SERVER_PORT'] ?? '';

export const JWT_SECRET = 'prisma-gql';
export const JWT_VALID_DAY_COUNT = 15;

export const CORS_ALLOWED_ORIGINS = isProduction ? '' : 'http://localhost:3010';
