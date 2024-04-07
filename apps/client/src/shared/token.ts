import { USER_TOEKN_LOCALSTORAGE_KEY } from './constants';

export const getToken = () => {
  return localStorage.getItem(USER_TOEKN_LOCALSTORAGE_KEY);
};

export const setToken = (token: string) => {
  return localStorage.setItem(USER_TOEKN_LOCALSTORAGE_KEY, token);
};

export const removeToken = () => {
  return localStorage.removeItem(USER_TOEKN_LOCALSTORAGE_KEY);
};
