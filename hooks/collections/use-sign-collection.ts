import { useCallback, useEffect, useState } from 'react';
import { useWriteContract } from 'wagmi';
import { ZERAHUB_CONTRACTS } from '@/constants';
import { toast } from 'sonner';
import { useCollection } from '@/lib/features/collection/hooks';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useRouter } from 'next/navigation';

export function useSignCollection() {
	const router = useRouter();
	const { chainId } = useAppKitNetwork();
	const { collection } = useCollection();
	const { isPending, data, writeContractAsync } = useWriteContract();
	const [isLoading, setIsLoading] = useState(false);
	const [collectionPrice, setCollectionPrice] = useState('0');

	useEffect(() => {
		if (data) {
			toast.info(`Transaction: ${data}`);
			router.refresh();
		}
	}, [data, router]);

	const onSignHandler = useCallback(async () => {
		try {
			const collectionId = collection.id;

			console.log('Registering collection:', {
				id: collectionId,
				price: collectionPrice,
			});

			setIsLoading(true);

			const writeContractPromise = writeContractAsync({
				address: ZERAHUB_CONTRACTS[chainId as keyof typeof ZERAHUB_CONTRACTS].collection
					.address as `0x${string}`,
				abi: ZERAHUB_CONTRACTS[chainId as keyof typeof ZERAHUB_CONTRACTS].collection.abi,
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
		} finally {
			setIsLoading(false);
		}
	}, [collection, collectionPrice, chainId, writeContractAsync]);

	return {
		isPending: isPending || isLoading,
		collectionPrice,
		setCollectionPrice,
		onSignHandler,
	};
}
