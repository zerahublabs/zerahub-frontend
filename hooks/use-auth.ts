import { useUser } from '@/lib/features/user/hooks';
import { useAppKitAccount, useAppKitEvents, useAppKitNetwork } from '@reown/appkit/react';
import { useLocalStorageState } from 'ahooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useSignMessage } from 'wagmi';

export interface UserProfile {
	id: string;
	username: string;
	address: string;
}

export function useAuthorization() {
	const router = useRouter();
	const { isConnected, status } = useAppKitAccount();
	const { data: event } = useAppKitEvents();
	const [isLogged, setIsLogged] = useState(false);
	const [profile, setProfile] = useState();
	const [token, setToken] = useLocalStorageState('token', {
		defaultValue: '',
	});

	const { login } = useUser();

	const onFetchUser = useCallback(async () => {
		const response = await fetch('/api/me/profile', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const responseJson = await response.json();
		if (responseJson.status == 'ok') {
			login(responseJson.data.username, responseJson.data.address);
			setProfile(responseJson.data);
			setIsLogged(true);
		} else {
			if (responseJson.message === 'Unauthorized') {
				setIsLogged(false);
			}
		}
	}, [token, login]);

	useEffect(() => {
		if (status === 'disconnected' && !isConnected) {
			router.push('/login');
		}
	}, [status, isConnected, router, token]);

	useEffect(() => {
		if (isConnected && token) {
			(async () => {
				onFetchUser();
			})();
		}
	}, [isConnected, token, onFetchUser]);

	useEffect(() => {
		if (event.event == 'DISCONNECT_SUCCESS') {
			setIsLogged(false);
			setToken('');
		}
	}, [event, setToken]);

	return {
		token,
		isLogged,
		profile,
		setToken,
	};
}

export function useAuthentication() {
	const { token, isLogged, setToken } = useAuthorization();
	const { isConnected, address } = useAppKitAccount();
	const { chainId } = useAppKitNetwork();
	const { signMessage, data: signatureData } = useSignMessage();

	const [isLoading, setIsLoading] = useState(false);
	const [isSignIn, setIsSignIn] = useState(false);

	const siweMessage = useMemo(() => {
		if (isConnected) {
			return new SiweMessage({
				scheme: 'http',
				domain: 'http',
				uri: 'http://localhost:3000',
				address: address,
				statement: 'Please confirm to signin with ethreum',
				chainId: Number(chainId),
				version: '1',
			});
		} else {
			return null;
		}
	}, [isConnected, address, chainId]);

	useEffect(() => {
		if (isConnected && !token && !isLogged) {
			setIsSignIn(true);
		}
	}, [isConnected, token, isLogged]);

	useEffect(() => {
		if (signatureData) {
			(async () => {
				try {
					const message = siweMessage?.prepareMessage();
					const res = await fetch(`/api/auths`, {
						method: 'post',
						cache: 'no-store',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							signature: signatureData,
							message: message,
						}),
					});
					const json = await res.json();

					const access_token = json['data']['access_token'];
					setToken(access_token);
					setIsSignIn(false);
				} catch (err) {
					if (err instanceof Error) {
						console.log(err.message);
					}
				}
				setIsLoading(false);
			})();
		}
	}, [signatureData, siweMessage, setToken]);

	const onSignInHandler = useCallback(async () => {
		setIsLoading(true);
		const message = siweMessage?.prepareMessage();
		signMessage({ message: message ?? '' });
	}, [siweMessage, signMessage]);

	return {
		isSignIn,
		isLoading,
		setIsSignIn,
		onSignInHandler,
	};
}
