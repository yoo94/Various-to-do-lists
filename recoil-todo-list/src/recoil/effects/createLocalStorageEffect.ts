import { AtomEffect } from 'recoil';

export const createLocalstorageEffect = <T>(key: string, defaultValue: T): AtomEffect<T> => {
  return ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue) as T);
    } else {
      setSelf(defaultValue);
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
};
