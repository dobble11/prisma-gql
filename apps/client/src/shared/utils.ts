import { getToken } from './token';

export const getReactQueryFetchParams = (): RequestInit => {
  const token = getToken();

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    mode: 'cors',
    credentials: 'include',
  };
};

type Without<T, U> = { [K in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type Success<V> = [err: undefined, value: V];
type Failure = [err: Error, value: undefined];

export function tryit<T>(promise: Promise<T>): Promise<XOR<Success<T>, Failure>> {
  return promise.then(
    (value) => [void 0, value],
    (err) => [err, void 0],
  );
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export function logout() {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}
