import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCollectionData, resetCollectionData, Collection } from './slice';
import { useCallback } from 'react';

export function useCollection() {
	const dispatch = useDispatch();
	const collection = useSelector((state: RootState) => state.collection);

	const setCollection = useCallback(
		(collection: Collection) => {
			dispatch(setCollectionData(collection));
		},
		[dispatch],
	);

	const setCollectionFiles = useCallback(
		(files: Collection['files']) => {
			dispatch(setCollectionData({ ...collection, files })); // Update only files in the collection
		},
		[dispatch, collection],
	);

	const resetCollection = useCallback(() => {
		dispatch(resetCollectionData());
	}, [dispatch]);

	return { collection, setCollection, resetCollection, setCollectionFiles };
}
