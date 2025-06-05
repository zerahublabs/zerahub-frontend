import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCollectionData, resetCollectionData, Collection } from './slice';
import { useCallback } from 'react';

export function useCollection() {
	const dispatch = useDispatch();
	const collection = useSelector((state: RootState) => state.collection);

	const setCollection = useCallback((collection: Collection) => {
		dispatch(setCollectionData(collection));
	}, [dispatch]);

	const resetCollection = useCallback(() => {
		dispatch(resetCollectionData());
	}, [dispatch]);

	return { collection, setCollection, resetCollection };
}
