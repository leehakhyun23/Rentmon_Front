import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./UserSlice";
import recentSlice from "./RecentSlice";
import spaceSlice from './SpaceSlice';
import searchSlice from './SearchSlice';


import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";


const reducers = combineReducers({
    user : userSlice.reducer,
    recent : recentSlice.reducer,
    space : spaceSlice.reducer,
    search : searchSlice.reducer
});

const persistConfig={
    key:"root",
    storage,
    whitelist:['user','recent', 'space', 'search']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware({serializableCheck:false}),
});