import { Middleware } from "@reduxjs/toolkit";

const localStorageMiddleware: Middleware = (store => next => action => {
  const result = next(action);
  localStorage.setItem("react-todos", JSON.stringify(store.getState().todos))
  return result
})
const preloadlocalStorage = JSON.parse(localStorage.getItem("react-todos") || '[]');

export { localStorageMiddleware, preloadlocalStorage };