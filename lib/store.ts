import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/user/slice';
import collectionReducer from './features/collection/slice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
			collection: collectionReducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
