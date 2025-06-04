import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
	isLogged: boolean;
	username: string;
	address: string;
}

const initialState: IUser = {
	isLogged: false,
	username: '',
	address: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsLogged: (state: IUser, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload;
		},
		setUsername: (state: IUser, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setAddress: (state: IUser, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
		setUser: (state: IUser, action: PayloadAction<IUser>) => {
			state.isLogged = action.payload.isLogged;
			state.username = action.payload.username;
			state.address = action.payload.address;
		},
		resetUser: (state: IUser) => {
			state.isLogged = false;
			state.username = '';
			state.address = '';
		},
	},
});

export const { setIsLogged, setUsername, setAddress, setUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
