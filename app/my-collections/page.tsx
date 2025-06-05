'use client';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { DatasetSkeleton } from '@/components/ui/shadcn/dataset';
import { useUserCollections } from '@/hooks/collections/use-collections';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DatasetItemComp = dynamic(() => import('@/components/ui/shadcn/dataset'), {
	ssr: false,
	loading: () => <DatasetSkeleton />,
});

export default function Page() {
	const { collections, isLoading } = useUserCollections();

	return (
		<div className="flex w-full h-full flex-row gap-4">
			{collections.length === 0 ? (
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
			) : (
				<div className="flex flex-col gap-4 mt-4 w-full mx-4">
					<div className="flex justify-end">
						<Link href={'/my-collections/create'}>
							<Button>Create Dataset</Button>
						</Link>
					</div>
					<div className="grid w-full grid-cols-1 lg:grid-cols-4 gap-2 auto-rows-fr justify-center">
						{isLoading
							? [0, 0, 0, 1, 1, 1, 1, 1].map((item, i) => (
									<div key={i} className="w-full">
										<DatasetSkeleton />
									</div>
								))
							: collections.map((item, i) => (
									<div key={i} className="w-sm lg:w-full">
										<DatasetItemComp
											item={item}
											url={`/my-collections/${item.id}`}
										/>
									</div>
								))}
					</div>
				</div>
			)}
		</div>
	);
}
