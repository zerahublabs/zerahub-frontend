import { BASE_URL_API } from '@/constants';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { useLocalStorageState } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useSignMessage } from 'wagmi';

export function useAuthorization() {
	const { isConnected } = useAppKitAccount();

	const [isLogged, setIsLogged] = useState(false);
	const [token, setToken] = useLocalStorageState('token', {
		defaultValue: '',
	});

	useEffect(() => {
		if (isConnected && token) {
			setIsLogged(true);
		}
	}, [isConnected, token]);

	return {
		token,
		isLogged,
		setToken
	};
}

export function useAuthentication() {
	const { token, setToken } = useAuthorization()
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
		if (isConnected && !token) {
				setIsSignIn(true);
		}
	}, [isConnected, token]);

	useEffect(() => {
		if (signatureData) {
			(async() => {
				try {
					const message = siweMessage?.prepareMessage()
					const res = await fetch(`${BASE_URL_API}/auths`, {
						method: 'post',
						headers: {
							"Content-Type": 'application/json'
						},
						body: JSON.stringify({
							signature: signatureData,
							message: message
						})
					})
					const json = await res.json()

					const access_token = json['data']['access_token']
					setToken(access_token)
					setIsSignIn(false)
				} catch (err) {
					if (err instanceof Error) {
						console.log(err.message)
					}
				}
				setIsLoading(false)
			})()
		}
	}, [signatureData, siweMessage, setToken])

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
