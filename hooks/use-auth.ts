'use client';
import { generateRandomNonce } from '@/lib/string';
import { useAppKitAccount, useAppKitEvents, useDisconnect } from '@reown/appkit/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSignMessage } from 'wagmi';
import useHttp from './use-http';
import { useLocalStorageState } from 'ahooks';

interface AuthRequestDataProps {
	address: `0x${string}`;
	signature: `0x${string}`;
	salt: string;
}

interface AuthResponseDataProps {
	data: {
		address: `0x${string}`;
		token: string;
		username: string;
	};
	status: 'ok' | 'bad';
}

interface UpdateUsernameDataProps {
	status: 'ok' | 'bad';
}

export function useAuthRequest(data: AuthRequestDataProps) {
	const [tokenStorage, setTokenStorage] = useState<string | null | undefined>(undefined);
	const [addressStorage, setAddressStorage] = useState<`0x${string}`>();
	const [usernameStorage, setUsernameStorage] = useState<string>();
	const { sendRequest, loading, data: response } = useHttp();

	useEffect(() => {
		const responseWithInterface = response as AuthResponseDataProps;
		if (responseWithInterface && responseWithInterface.status == 'ok') {
			const token = responseWithInterface.data.token;
			const address = responseWithInterface.data.address;
			const username = responseWithInterface.data.username;

			setTokenStorage(token);
			setAddressStorage(address);
			setUsernameStorage(username);
		}
	}, [response, setTokenStorage, setAddressStorage, setUsernameStorage]);

	const sendAuthRequest = useCallback(() => {
		sendRequest({
			method: 'post',
			url: '/public/signin',
			data: data,
		});
	}, [data, sendRequest]);

	return {
		loading,
		token: tokenStorage,
		address: addressStorage,
		username: usernameStorage,
		sendAuthRequest,
	};
}

export function useUpdateUsernameRequest() {
	const [tokenStorage] = useLocalStorageState('token', {
		defaultValue: '',
	});
	const [username, setUsername] = useState<string>('');
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const { loading, data: response, sendRequest } = useHttp();

	useEffect(() => {
		const responseWithInterface = response as UpdateUsernameDataProps;
		console.log(responseWithInterface);
		if (responseWithInterface && responseWithInterface.status == 'ok') {
			setIsSuccess(true);
		}
	}, [response]);

	const sendUpdateRequest = useCallback(() => {
		sendRequest({
			method: 'patch',
			url: '/private/username',
			data: {
				username,
			},
			headers: {
				'X-Token': tokenStorage,
			},
		});
	}, [username, tokenStorage, sendRequest]);

	return {
		isSuccess,
		loading,
		username,
		setUsername,
		sendUpdateRequest,
	};
}

export function useSignatureData() {
	const { address } = useAppKitAccount();

	const nonce = useMemo(() => generateRandomNonce(), []);

	const message = useMemo(
		() => `Welcome to ZeraHub!

Click "Sign" to sign in. This request will not trigger a blockchain transaction or cost any gas fees.

Wallet Address: ${address}
Version: 1
Nonce: ${nonce}

Only sign this message if you trust this application.`,
		[address, nonce],
	);

	return {
		nonce,
		message,
	};
}

export function useAuth() {
	const { data: appkitEventData } = useAppKitEvents();
	const { disconnect } = useDisconnect();
	const { address, isConnected } = useAppKitAccount();
	const { signMessage, data } = useSignMessage();
	const { message, nonce } = useSignatureData();
	const { sendAuthRequest, loading, token, username } = useAuthRequest({
		address: (address as `0x${string}`) || '',
		salt: nonce,
		signature: (data as `0x${string}`) || '',
	});

	const [isNeedsUsername, setIsNeedsUsername] = useState(false);
	const [hasAuthRequestSent, setHasAuthRequestSent] = useState(false);
	const [isShownSignMessage, setShownSignMessage] = useState(false);
	const [tokenStorage, setTokenStorage] = useLocalStorageState<string | null>('token', {
		defaultValue: null,
	});
	const [, setUsernameStorage] = useLocalStorageState<string | null>('username', {
		defaultValue: null,
	});

	// for appkit event disconnected
	useEffect(() => {
		if (appkitEventData.event == 'DISCONNECT_SUCCESS') {
			setTokenStorage(null);
			setUsernameStorage(null);
		}
	}, [appkitEventData, setTokenStorage, setUsernameStorage]);

	// for store username and token to local storage
	useEffect(() => {
		if (typeof username === 'string') {
			setUsernameStorage(username);
		}
		if (token) {
			setTokenStorage(token);
		}
	}, [token, username, setTokenStorage, setUsernameStorage]);

	// for check if wallet is connected and token storage is not null
	useEffect(() => {
		if (isConnected && tokenStorage == null) {
			setShownSignMessage(true);
		}
	}, [isConnected, tokenStorage]);

	// for send auth request
	useEffect(() => {
		if (!hasAuthRequestSent && typeof data != 'undefined' && !loading) {
			sendAuthRequest();
			setHasAuthRequestSent(true);
		}
	}, [data, loading, hasAuthRequestSent, sendAuthRequest]);

	// for check if user is need username
	useEffect(() => {
		if (typeof username == 'undefined' || username == null) {
			setIsNeedsUsername(true);
		}
	}, [username]);

	// sign message
	const onSignMessage = useCallback(() => {
		signMessage({
			message,
		});
		setHasAuthRequestSent(false);
	}, [signMessage, message]);

	return {
		address,
		isConnected,
		loading,
		username,
		token,
		isNeedsUsername,
		isShownSignMessage,
		disconnect,
		onSignMessage,
		setIsNeedsUsername,
	};
}
