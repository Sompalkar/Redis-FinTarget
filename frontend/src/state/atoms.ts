import { atom } from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: localStorage.getItem('token') || '',
});

export const taskCountState = atom({
  key: 'taskCountState',
  default: 0,
});