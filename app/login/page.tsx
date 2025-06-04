'use client';
import Wallet from '@/components/block/wallet/wallet';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { useAuthentication, useAuthorization } from '@/hooks/use-auth';
import { useUser } from '@/lib/features/user/hooks';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { WalletMinimal } from 'lucide-react';
import React from 'react';

export default function Page() {
	const { open } = useAppKit();
	const { isConnected } = useAppKitAccount();
	const { isLogged } = useAuthorization();
	const { isLoading } = useAuthentication();
	const { username } = useUser();

	if (isConnected && isLogged) {
		return (
			<Card className="flex w-full h-full flex-col gap-4">
				<CardContent className="flex gap-8 flex-col justify-center items-center flex-1">
					<div className="relative">
						<WalletMinimal className="size-24 text-primary" />
					</div>
					<div className="space-y-1 text-center">
						<p className="text-lg font-medium">@{username}</p>
						<p className="text-sm text-muted-foreground">Wallet Connected</p>
					</div>
					<Wallet />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="flex w-full h-full flex-col gap-4">
			<CardContent className="flex gap-6 flex-col justify-center items-center flex-1">
				<WalletMinimal className="size-28 animate-bounce" />
				<p className="text-muted-foreground text-sm text-center font-semibold">
					To get started, please connect your wallet.
					<br />
					Click the button below to connect your wallet.
				</p>
				<Button disabled={isLoading} onClick={() => open({ view: 'Connect' })}>
					Connect Wallet
				</Button>
			</CardContent>
		</Card>
	);
}
