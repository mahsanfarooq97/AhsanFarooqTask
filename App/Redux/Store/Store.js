import { applyMiddleware, combineReducers,createStore } from 'redux';
import thunk from 'redux-thunk';
import GenericReducer from '../Reducer/GenericReducer';

const AppReducers = combineReducers({
    GenericReducer: GenericReducer
});

const rootReducer = (state, action) => AppReducers(state, action);

// const persistConfig = {
//   // Root
//   key: 'root',
//   // Storage Method (React Native)
//   storage: AsyncStorage,
//   // Whitelist (Save Specific Reducers)
//   whitelist: [],
//   // Blacklist (Don't Save Specific Reducers)
//   blacklist: [
//     'Learning',
//     'MultiLang',
//     'Services',
//     'Configration',
//     'Assets',
//     'User',
//     'Notifications',
//     'SocketConnection',
//     'DeleteModel',
//     'AuthReducer'
//   ],
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
// Middleware: Redux Persist Persister
// let persistor = persistStore(store);
// Exports
export {
  store,
  // persistor,
};

// export default legacy_createStore(
//     persistedReducer,
//     applyMiddleware(thunk)
// );
