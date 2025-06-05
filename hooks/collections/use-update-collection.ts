import { FormEvent, useCallback, useState } from 'react';
import { useAuthorization } from '../use-auth';
import { toast } from 'sonner';
import { useCollection } from '@/lib/features/collection/hooks';

export function useUpdateCoverCollection() {
	const { token } = useAuthorization();
	const { collection } = useCollection();
	const [cover, setCover] = useState<File>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const updateCollectionHandler = useCallback(async () => {
		if (!cover) return;

		const formData = new FormData();
		formData.append('file', cover);

		await fetch(`/api/me/collections/${collection.id}/cover`, {
			cache: 'no-store',
			method: 'put',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
	}, [token, cover, collection]);

	const onSubmitHandler = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			setIsLoading(true);

			try {
				const updatePromise = updateCollectionHandler();

				toast.promise(updatePromise, {
					loading: 'Updating collection...',
					success: 'Collection updated',
					error: 'Update failed',
				});
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[updateCollectionHandler],
	);

	return {
		isLoading,
		cover,
		setCover,
		onSubmitHandler,
	};
}

export function useUpdateCollection() {
	const { token } = useAuthorization();
	const { collection } = useCollection();
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const updateCollectionHandler = useCallback(async () => {
		const response = await fetch(`/api/me/collections/${collection.id}`, {
			cache: 'no-store',
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: title,
				description: description,
				price: 0,
			}),
		});
		console.log(await response.json());
	}, [title, description, token, collection]);

	const onSubmitHandler = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			setIsLoading(true);

			try {
				const updatePromise = updateCollectionHandler();

				toast.promise(updatePromise, {
					loading: 'Updating collection...',
					success: 'Collection updated',
					error: 'Update failed',
				});
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[updateCollectionHandler],
	);

	return {
		title,
		description,
		isLoading,
		setTitle,
		setDescription,
		onSubmitHandler,
	};
}
