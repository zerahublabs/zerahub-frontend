import { useCollection } from '@/lib/features/collection/hooks';
import { useAuthorization } from '../use-auth';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'sonner';

export function useUploadFiles() {
	const { token } = useAuthorization();
	const { collection } = useCollection();
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File | null>(null);

	const requestUploadFiles = useCallback(
		async (collectionId: string) => {
			try {
				const response = await fetch(`/api/me/collections/${collectionId}/request-upload`, {
					method: 'post',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						key: 'abcdefgh',
						type: files?.type,
						size: files ? (await files.arrayBuffer()).byteLength : undefined,
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
		[token, files],
	);

	const confirmUploadFiles = useCallback(
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

	const uploadFileHandler = useCallback(async () => {
		const requestUploadResponse = await requestUploadFiles(collection.id);
		if (!requestUploadResponse || requestUploadResponse.status !== 'ok') return;

		try {
			await fetch(requestUploadResponse.data.url, {
				cache: 'no-store',
				method: 'put',
				headers: {
					'Content-Type': files?.type || '',
				},
				body: files,
			});
			const confirmUploadResponse = await confirmUploadFiles(
				collection.id,
				requestUploadResponse.data.id,
			);
			if (!confirmUploadResponse || confirmUploadResponse.status !== 'ok') {
				throw new Error('File upload confirmation failed');
			}

			const response = await fetch(`/api/me/collections/${collection.id}/commit`, {
				cache: 'no-store',
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					storageId: requestUploadResponse.data.id,
					filename: files?.name,
					size: (await files?.arrayBuffer())?.byteLength,
				}),
			});
			if (!response.ok) {
				throw new Error('File upload commit failed');
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
			return null;
		}
	}, [collection.id, files, token, requestUploadFiles, confirmUploadFiles]);

	const onUploadHandler = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			if (!collection) return;
			if (!files) {
				toast.error('Please select a file to upload');
				return;
			}
			setIsLoading(true);

			const createPromise = uploadFileHandler();
			toast.promise(createPromise, {
				loading: 'Uploading file...',
				success: 'File uploaded successfully',
				error: 'File upload failed',
			});
		},
		[collection, files, uploadFileHandler],
	);

	return {
		isLoading,
		files,
		onUploadHandler,
		setFiles,
	};
}
