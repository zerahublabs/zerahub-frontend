import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorization } from '../use-auth';
import { useRouter } from 'next/navigation';

interface CollectionData {
	id: string;
	title: string;
	description: string;
	price: number;
}

export function useCreateCollection() {
	const router = useRouter();
	const { token } = useAuthorization();
	const [cover, setCover] = useState<File>();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const createCollectionhandler = useCallback(async () => {
		const response = await fetch(`/api/me/collections`, {
			cache: 'no-store',
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: name,
				description: description,
				price: 0,
			}),
		});

		const responseJson = await response.json();
		if (response.status == 200) {
			return responseJson['data'] as CollectionData;
		} else {
			throw Error();
		}
	}, [name, description, token]);

	const requestUploadCollection = useCallback(
		async (collectionId: string) => {
			try {
				const response = await fetch(`/api/me/collections/${collectionId}/request-upload`, {
					method: 'post',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						key: 'abcdefgh',
						type: cover?.type,
						size: (await cover?.arrayBuffer())?.byteLength,
					}),
				});
				return await response.json();
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				}
				return null;
			}
		},
		[token, cover],
	);

	const confirmUploadCollection = useCallback(
		async (collectionId: string, requestId: string) => {
			try {
				const response = await fetch(`/api/me/collections/${collectionId}/confirm-upload`, {
					method: 'post',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						requestId,
					}),
				});
				return await response.json();
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				}
				return null;
			}
		},
		[token],
	);

	const uploadCoverCollectionHandler = useCallback(
		async (collectionId: string) => {
			if (!cover) return;

			const requestUploadResponse = await requestUploadCollection(collectionId);
			if (!requestUploadResponse || requestUploadResponse.status != 'ok') return;

			try {
				await fetch(requestUploadResponse.data.url, {
					cache: 'no-store',
					method: 'put',
					headers: {
						'Content-Type': cover.type,
					},
					body: cover,
				});

				const confirmUploadResponse = await confirmUploadCollection(
					collectionId,
					requestUploadResponse.data.id,
				);

				const response = await fetch(`/api/me/collections/${collectionId}/cover`, {
					cache: 'no-store',
					method: 'put',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						storageId: confirmUploadResponse.data.id,
					}),
				});
				if (!response.ok) {
					throw new Error('Failed to upload cover image');
				}
				toast.success('Cover image uploaded successfully');
				router.push(`/my-collections/${collectionId}`);
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		[cover, router, token, requestUploadCollection, confirmUploadCollection],
	);

	const pushCollectionToContract = useCallback(() => {}, []);

	const onSubmitHandler = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			setIsLoading(true);

			try {
				// First create the collection
				const createPromise = createCollectionhandler();
				toast.promise(createPromise, {
					loading: 'Creating dataset...',
					success: 'Dataset created successfully',
					error: 'Failed to create dataset',
				});

				const collectionData = await createPromise;

				// Then upload the cover if we have one
				if (cover && collectionData.id) {
					const uploadPromise = uploadCoverCollectionHandler(collectionData.id);
					toast.promise(uploadPromise, {
						loading: 'Uploading cover image...',
						success: 'Cover image uploaded successfully',
						error: 'Failed to upload cover image',
					});
				}
			} catch (error) {
				console.error('Error creating collection:', error);
			} finally {
				setIsLoading(false);
			}
		},
		[createCollectionhandler, uploadCoverCollectionHandler, cover],
	);

	return {
		cover,
		name,
		description,
		isLoading,
		setCover,
		setName,
		setDescription,
		onSubmitHandler,
		pushCollectionToContract,
	};
}
