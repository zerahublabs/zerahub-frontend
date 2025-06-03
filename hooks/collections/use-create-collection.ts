import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorization } from '../use-auth';

export function useCreateCollection() {
	const { token } = useAuthorization();
	const [cover, setCover] = useState<File>();
	const [name, setName] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [collection, setCollection] = useState();
	const [isConfirmPushContract, setIsConfirmPushContract ] = useState(true)

	const createCollectionhandler = useCallback(async () => {
		const response = await fetch(`/api/collection`, {
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
			setCollection(responseJson['data']);
		} else {
			throw Error();
		}
	}, [name, description, token]);

	const uploadCoverCollectionHandler = useCallback(async () => {
		const formData = new FormData();
		formData.append('file', cover as File);

		try {
			const response = await fetch(`/api/collection/${collection?.['id']}/cover`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			await response.json();
		} catch (error) {
			console.error(error)
		}
	}, [cover, collection, token]);

	const pushCollectionToContract = useCallback(() => {

	}, [])

	const onSubmitHandler = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			setIsLoading(true);
			toast.promise(createCollectionhandler, {
				success: 'Dataset submited',
				loading: 'Submit a dataset data',
				error: 'Error',
			});

			toast.promise(uploadCoverCollectionHandler, {
				success: 'Uploading dataset cover',
				loading: 'Cover uploaded',
				error: 'Error',
			});

			setIsConfirmPushContract(true)
			setIsLoading(false);
		},
		[createCollectionhandler, uploadCoverCollectionHandler],
	);

	return {
		cover,
		name,
		description,
		isLoading,
		isConfirmPushContract,
		setCover,
		setName,
		setDescription,
		onSubmitHandler,
		pushCollectionToContract
	};
}
