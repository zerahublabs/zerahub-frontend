'use client'
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
	const { open } = useAppKit();
	const { isConnected } = useAppKitAccount();

	if (!isConnected) {
		return (
			<div className="flex w-full h-full p-4 flex-row gap-4">
				<div className="flex w-full flex-col gap-4 flex-1">
					<Card className="flex flex-1">
						<CardContent className="flex gap-6 flex-col justify-center items-center flex-1">
							<p className="text-muted-foreground text-sm text-center font-semibold">
								To get started, please connect your wallet.
								<br />
								Click the button below to connect your wallet.
							</p>
							<Button onClick={() => open({ view: 'Connect' })}>Connect Wallet</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full h-full flex-row gap-4">
			<div className="flex w-full flex-col gap-4 flex-1">
				<Card className="flex flex-1">
					<CardContent className="flex gap-6 flex-col justify-center items-center flex-1">
						<p className="text-muted-foreground text-sm text-center font-semibold">
							You don&apos;t have any datasets yet.
							<br />
							Create a new dataset to get started.
						</p>
						<Link href={'/my-datasets/create'}>
							<Button>Create Dataset</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
