import { useCallback } from 'react';

export default function usePublishCollection() {
	const onPublishHandler = useCallback(() => {}, []);

	return {
		onPublishHandler,
	};
}
