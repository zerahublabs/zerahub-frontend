import { useAppKitAccount } from '@reown/appkit/react';
import { useLocalStorageState } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import useHttp from './use-http';
import { useAuth } from './use-auth';

interface GetMeResponseDataProps {
	status: 'ok' | 'bad';
	data: {
		username: string;
		point: number;
	};
	detail?: string;
}

export function useMe() {
	const { isConnected } = useAppKitAccount();
	const { sendRequest, data: response } = useHttp();
	const { clearToken } = useAuth();
	const [tokenStorage] = useLocalStorageState<string | null>('token', {
		defaultValue: null,
	});
	const [username, setUsername] = useState<string>();

	const sendGetMeRequest = useCallback(() => {
		if (!tokenStorage) {
			setUsername(undefined);
			return;
		}

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
		if (responseWithInterface) {
			if (responseWithInterface.status === 'ok') {
				setUsername(responseWithInterface.data.username);
			} else if (
				responseWithInterface.status === 'bad' &&
				responseWithInterface.detail === 'unauth'
			) {
				setUsername(undefined);
				clearToken();
			}
		}
	}, [response, clearToken]);

	useEffect(() => {
		if (!isConnected || !tokenStorage) {
			setUsername(undefined);
		} else {
			sendGetMeRequest();
		}
	}, [isConnected, tokenStorage, sendGetMeRequest]);

	return {
		username,
	};
}
