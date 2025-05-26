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
	const [tokenStorage, setTokenStorage] = useState<string | undefined>(undefined);
	const [addressStorage, setAddressStorage] = useState<`0x${string}`>();
	const [username, setUsername] = useState<string | undefined>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const { sendRequest, data: response } = useHttp();

	useEffect(() => {
		const responseWithInterface = response as AuthResponseDataProps;
		if (responseWithInterface && responseWithInterface.status == 'ok') {
			const token = responseWithInterface.data.token;
			const address = responseWithInterface.data.address;
			setUsername(responseWithInterface.data.username);
			setTokenStorage(token);
			setAddressStorage(address);
			setIsSuccess(true)
		}
	}, [response, setTokenStorage, setAddressStorage]);

	const sendAuthRequest = useCallback(() => {
		sendRequest({
			method: 'post',
			url: '/public/signin',
			data: data,
		});
	}, [data, sendRequest]);

	return {
		username,
		isSuccess,
		token: tokenStorage,
		address: addressStorage,
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
	const { sendAuthRequest, isSuccess, token, username } = useAuthRequest({
		address: (address as `0x${string}`) || '',
		salt: nonce,
		signature: (data as `0x${string}`) || '',
	});

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isNeedsUsername, setIsNeedsUsername] = useState(false);
	const [hasAuthRequestSent, setHasAuthRequestSent] = useState(false);
	const [isShownSignMessage, setShownSignMessage] = useState(false);
	const [tokenStorage, setTokenStorage] = useLocalStorageState<string | undefined>('token', {
		defaultValue: undefined,
	});

	// for appkit event disconnected
	useEffect(() => {
		if (appkitEventData.event == 'DISCONNECT_SUCCESS') {
			setTokenStorage(undefined);
		}
	}, [appkitEventData, setTokenStorage]);

	// for store username and token to local storage
	useEffect(() => {
		if (token) {
			setTokenStorage(token);
		}
	}, [token, username, setTokenStorage]);

	// for check if wallet is connected and token storage is not undefined
	useEffect(() => {
		setIsLoading(!!isSuccess || isLoading);

		if (isConnected && typeof tokenStorage == 'undefined') {
			setShownSignMessage(true);
		} else if (isConnected && typeof tokenStorage !== 'undefined') {
			setShownSignMessage(false);
		}
	}, [isConnected, tokenStorage, isSuccess, isLoading]);

	// for send auth request
	useEffect(() => {
		if (!hasAuthRequestSent && typeof data != 'undefined' && !isSuccess) {
			sendAuthRequest();
			setHasAuthRequestSent(true);
		}
	}, [data, isSuccess, hasAuthRequestSent, sendAuthRequest]);

	// for check if user is need username
	useEffect(() => {
		if (typeof username == 'undefined' || username == null) {
			setIsNeedsUsername(true);
		} else {
			setIsNeedsUsername(false);
		}
	}, [username]);

	// sign message
	const onSignMessage = useCallback(() => {
		setIsLoading(true)
		signMessage({
			message,
		});
		setHasAuthRequestSent(false);
	}, [signMessage, message]);

	return {
		address,
		isConnected,
		isLoading,
		username,
		token,
		isNeedsUsername,
		isShownSignMessage,
		disconnect,
		onSignMessage,
		setIsNeedsUsername,
	};
}
