import { useState, useEffect } from 'react';
import { useAuthorization } from '../use-auth';
import { toast } from 'sonner';
import { useCollection } from '@/lib/features/collection/hooks';
import { Collection } from '@/lib/features/collection/slice';

export function useUserCollections() {
	const [collections, setCollections] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { token } = useAuthorization();

	useEffect(() => {
		async function fetchCollections() {
			try {
				const response = await fetch('/api/me/collections', {
					cache: 'no-store',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch collections');
				}

				const data = await response.json();
				setCollections(data.data || []);
			} catch (error) {
				toast.error('Error fetching collections');
				console.error('Error fetching collections:', error);
				setCollections([]);
			} finally {
				setIsLoading(false);
			}
		}

		if (token) {
			fetchCollections();
		} else {
			setIsLoading(false);
		}
	}, [token]);

	return {
		collections,
		isLoading,
	};
}

export function useCollections() {
	const [collections, setCollections] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { token } = useAuthorization();

	useEffect(() => {
		async function fetchCollections() {
			try {
				const response = await fetch('/api/collections', {
					cache: 'no-store',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch collections');
				}

				const data = await response.json();
				setCollections(data.data || []);
			} catch (error) {
				toast.error('Error fetching collections');
				console.error('Error fetching collections:', error);
				setCollections([]);
			} finally {
				setIsLoading(false);
			}
		}

		if (token) {
			fetchCollections();
		} else {
			setIsLoading(false);
		}
	}, [token]);

	return {
		collections,
		isLoading,
	};
}

export function useCollectionDetails(collectionId: string) {
	const { setCollection } = useCollection();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCollections() {
			try {
				const response = await fetch(`/api/collections/${collectionId}`, {
					cache: 'no-store',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch collections');
				}

				const data = await response.json();
				setCollection(data.data);
				setIsLoading(false);
			} catch (error) {
				toast.error('Error fetching collections');
				console.error('Error fetching collections:', error);
				setIsLoading(false);
			}
		}

		fetchCollections();
	}, [collectionId, setCollection]);

	return {
		isLoading,
	};
}
