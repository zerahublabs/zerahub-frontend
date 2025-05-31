'use client';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { DatasetItem } from '@/components/ui/shadcn/dataset';
import { dataset_samples, DatasetProps } from '@/constants/datasets';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Link from 'next/link';
import React, { useMemo } from 'react';

export function MyDatasets({ datasets }: { datasets: DatasetProps[] }) {
	return (
		<div className="flex flex-col gap-4 mt-4">
			<div className="flex justify-end">
				<Link href={'/my-datasets/create'}>
					<Button>Create Dataset</Button>
				</Link>
			</div>
			<div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-fr">
				{datasets.slice(0, 10).map((item, i) => (
					<div key={i} className="w-full">
						<DatasetItem item={item} />
					</div>
				))}
			</div>
		</div>
	);
}

export default function Page() {
	const { open } = useAppKit();
	const { isConnected } = useAppKitAccount();
	const datasets = useMemo(() => dataset_samples, []);

	if (!isConnected) {
		return (
			<div className="flex w-full h-full flex-row gap-4">
				<div className="flex w-full flex-col gap-4 flex-1">
					<Card className="flex flex-1">
						<CardContent className="flex gap-6 flex-col justify-center items-center flex-1">
							<p className="text-muted-foreground text-sm text-center font-semibold">
								To get started, please connect your wallet.
								<br />
								Click the button below to connect your wallet.
							</p>
							<Button onClick={() => open({ view: 'Connect' })}>
								Connect Wallet
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full h-full flex-row gap-4">
			{datasets.length === 0 ? (
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
			) : (
				<MyDatasets datasets={datasets} />
			)}
		</div>
	);
}
