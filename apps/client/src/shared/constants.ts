export const isProduction = import.meta.env.MODE === 'prod';

export const SERVER_ENDPOINT = isProduction ? '' : 'http://localhost:4010';
export const GRAPHQL_ENDPOINT = `${SERVER_ENDPOINT}/graphql`;

export const UNAUTHORIZED_ERROR_KEY = 'UNAUTHENTICATED';

export const USER_TOEKN_LOCALSTORAGE_KEY = 'jwt_token';
