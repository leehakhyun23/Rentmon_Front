import userReducer from '../reducer/userReducer';
import rootReducer from '../reducers/index';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    users: userReducer
  }
});

export default store;