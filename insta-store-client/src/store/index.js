import {combineReducers} from 'redux'
import storeReducer from './reducers/store.reducer'
import locationReducer from './reducers/location.reducer'
import {persistReducer } from 'redux-persist'
import {createStore,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


export const rootReducer = combineReducers({
    stores:storeReducer,
    location:locationReducer
   
  })




const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = rootReducer && createStore(persistedReducer,applyMiddleware(ReduxThunk));

export {store};