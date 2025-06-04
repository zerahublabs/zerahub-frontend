import { useCallback, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import { Collection } from './use-collections';
import { ZERAHUB_CONTRACTS } from '@/constants';
import { toast } from 'sonner';

export function useSignCollection(collection?: Collection) {
	const { isPending, data, writeContractAsync } = useWriteContract();

	useEffect(() => {
		if (data) {
			toast.info(`Transaction: ${data}`)
		}
	}, [data]);

	const onSignHandler = useCallback(async () => {
		try {
			if (!collection?.id) {
				throw new Error('Collection ID is required');
			}

			const collectionId = collection.id;
			// For now, we'll use a fixed price since the Collection interface has price: 0
			const collectionPrice = BigInt(1); // 1 wei as minimum price

			console.log('Registering collection:', {
				id: collectionId,
				price: collectionPrice.toString(),
			});

			const writeContractPromise = writeContractAsync({
				address: ZERAHUB_CONTRACTS.collection.address as `0x${string}`,
				abi: ZERAHUB_CONTRACTS.collection.abi,
				functionName: 'registerCollection',
				args: [collectionId, collectionPrice],
			});

			toast.promise(writeContractPromise, {
				success: 'Successfully registered collection on-chain',
				error: 'Failed to register collection on-chain',
				loading: 'Registering collection on-chain...',
			});

			await writeContractPromise;
		} catch (error) {
			console.error('Error in onSignHandler:', error);
			toast.error(error instanceof Error ? error.message : 'Failed to register collection');
		}
	}, [collection, writeContractAsync]);

	return {
		isPending,
		onSignHandler,
	};
}
