import { useCollection } from '@/lib/features/collection/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useAuthorization } from '../use-auth';
import { CollectionFiles } from '@/lib/features/collection/slice';

export function useCollectionFiles() {
	const { token } = useAuthorization();
	const { collection } = useCollection();
	const [files, setFiles] = useState<CollectionFiles[]>([]);
	const [isAlreadyFetched, setIsAlreadyFetched] = useState(false);

	const fetchCollectionFiles = useCallback(async () => {
		const response = await fetch(`/api/me/collections/${collection.id}/files`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch collection files');
		}
		const data = await response.json();
		setFiles(data.data);
	}, [collection.id, token]);

	useEffect(() => {
		fetchCollectionFiles();
		setIsAlreadyFetched(true);
	}, [collection, isAlreadyFetched, fetchCollectionFiles]);

	return {
		files
	};
}
