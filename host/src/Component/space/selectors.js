// src/selectors.js
import { createSelector } from 'reselect';

// 사용자 상태를 가져오는 선택자
const selectUserState = (state) => state.user;

// 메모이제이션된 사용자 선택자
export const makeSelectUser = () =>
  createSelector([selectUserState], (user) => user);
