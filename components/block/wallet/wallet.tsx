'use client';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import React from 'react';
import WalletAccount from './wallet-account';
import { Button } from '@/components/ui/shadcn/button';

export default function Wallet() {
	const { open } = useAppKit();
	const { isConnected } = useAppKitAccount();

	if (!isConnected) {
		return (
			<Button variant={'outline'} onClick={() => open({ view: 'Connect' })}>
				Connect Wallet
			</Button>
		);
	}

	return <WalletAccount />;
}
