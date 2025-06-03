import { useState, useEffect } from 'react';
import { useAuthorization } from '../use-auth';
import { toast } from 'sonner';

export interface Collection {
	id: string;
	userId: string;
	title: string;
	description: string;
	price: 0;
	cover: null;
	isDeleted: false;
	createdAt: string;
	updatedAt: string;
	deletedAt: null;
	user: {
		id: string;
		address: string;
	};
}

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
	const [collection, setCollection] = useState<Collection>();
	const [isLoading, setIsLoading] = useState(true);
	const { token } = useAuthorization();

	useEffect(() => {
		async function fetchCollections() {
			try {
				const response = await fetch(`/api/collections/${collectionId}`, {
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
				setCollection(data.data || []);
			} catch (error) {
				toast.error('Error fetching collections');
				console.error('Error fetching collections:', error);
			} finally {
				setIsLoading(false);
			}
		}

		if (token) {
			fetchCollections();
		} else {
			setIsLoading(false);
		}
	}, [token, collectionId]);

	return {
		collection,
		isLoading,
	};
}
