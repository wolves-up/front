import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import recipesSlice from './recipes/recipesSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ 
  user: userSlice,
  recipes: recipesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:  persistedReducer,  
  middleware: [thunk]
});

export const persistor = persistStore(store);