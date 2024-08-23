import infoReducer from '../reducer/infoReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    info: infoReducer,
  }
});

export default store;