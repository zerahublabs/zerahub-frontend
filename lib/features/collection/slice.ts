import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Collection = {
	id: string;
	userId: string;
	title: string;
	description: string;
	price: 0;
	cover: {
		id: string;
	};
	transactionHash: string | null;
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SUSPENDED';
	isDeleted: false;
	createdAt: string;
	updatedAt: string;
	deletedAt: null;
	publisher: string;
};

const initialState: Collection = {
	id: '',
	userId: '',
	title: '',
	description: '',
	price: 0,
	cover: {
		id: '',
	},
	transactionHash: null,
	status: 'DRAFT',
	isDeleted: false,
	createdAt: '',
	updatedAt: '',
	deletedAt: null,
	publisher: '',
};

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		setCollectionData: (state, action: PayloadAction<Collection>) => {
			return action.payload;
		},
		resetCollectionData: () => {
			return initialState;
		},
	},
});

export const { setCollectionData, resetCollectionData } = collectionSlice.actions;

export default collectionSlice.reducer;
