export const isProduction = import.meta.env.MODE === 'prod';

export const SERVER_ENDPOINT = isProduction ? '' : 'http://localhost:4010';
export const GRAPHQL_ENDPOINT = `${SERVER_ENDPOINT}/graphql`;
