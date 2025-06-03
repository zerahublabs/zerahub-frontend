'use client';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { DatasetItem, DatasetSkeleton } from '@/components/ui/shadcn/dataset';
import { Collection, useUserCollections } from '@/hooks/collections/use-collections';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export function MyDatasets(props: { collections: Collection[], isLoading: boolean }) {
	const { collections, isLoading } = props;

	if (collections.length === 0) {
		return (
			<div className="flex w-full flex-col gap-4 flex-1">
				<Card className="flex flex-1">
					<CardContent className="flex gap-6 flex-col justify-center items-center flex-1">
						<p className="text-muted-foreground text-sm text-center font-semibold">
							You don&apos;t have any datasets yet.
							<br />
							Create a new dataset to get started.
						</p>
						<Link href={'/my-collections/create'}>
							<Button>Create Dataset</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 mt-4 w-full">
			<div className="flex justify-end">
				<Link href={'/my-collections/create'}>
					<Button>Create Dataset</Button>
				</Link>
			</div>
			<div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-fr">
				{
					isLoading ? [0, 0, 0, 1, 1, 1, 1, 1].map((item, i) => (
						<div key={i} className="w-full">
							<DatasetSkeleton />
						</div>
					)) : collections.map((item, i) => (
						<div key={i} className="w-full">
							<DatasetItem item={item} />
						</div>
					))
				}
			</div>
		</div>
	);
}

export default function Page() {
	const { open } = useAppKit();
	const { isConnected } = useAppKitAccount();
	const { collections, isLoading } = useUserCollections();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) {
		return null;
	}

	if (!isConnected) {
		return (
			<div className="flex w-full h-full">
				<Card className="flex w-full h-full flex-col gap-4">
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
		);
	}

	return (
		<div className="flex w-full h-full flex-row gap-4">
			<MyDatasets collections={collections} isLoading={isLoading} />
		</div>
	);
}
