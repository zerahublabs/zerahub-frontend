import { useAppKitAccount } from '@reown/appkit/react';
import { useLocalStorageState } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import useHttp from './use-http';

interface GetMeResponseDataProps {
	status: 'ok' | 'bad';
	data: {
		username: string;
		point: number;
	};
}

export function useMe() {
	const { isConnected, address } = useAppKitAccount();
	const { sendRequest, data: response } = useHttp();
	const [tokenStorage] = useLocalStorageState<string | null>('token', {
		defaultValue: null,
	});
	const [username, setUsername] = useState<string>();

	const sendGetMeRequest = useCallback(() => {
		sendRequest({
			method: 'GET',
			url: '/private/me',
			headers: {
				'X-Token': tokenStorage,
			},
		});
	}, [tokenStorage, sendRequest]);

	useEffect(() => {
		const responseWithInterface = response as GetMeResponseDataProps;
		if (responseWithInterface && responseWithInterface.status == 'ok') {
			setUsername(responseWithInterface.data.username);
		}
	}, [response, address, setUsername]);

	useEffect(() => {
		if (isConnected) {
			sendGetMeRequest();
		}
	}, [isConnected, sendGetMeRequest]);

	return {
		username
	};
}
