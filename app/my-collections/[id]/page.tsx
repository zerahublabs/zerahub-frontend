'use client';
import { DetailsSkeleton } from '@/components/pages/collection/details';
import { ExploreSkeleton } from '@/components/pages/collection/explore';
import { OverviewSkeleton } from '@/components/pages/collection/overview';
import { StatsSkeleton } from '@/components/pages/collection/stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs';
import { useCollectionDetails } from '@/hooks/collections/use-collections';
import { BarChart, FileSearch, Info, Table } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const CollectionOverview = dynamic(() => import('@/components/pages/me/collection/overview'), {
	ssr: false,
	loading: () => <OverviewSkeleton />,
});
const CollectionExplore = dynamic(() => import('@/components/pages/me/collection/explore'), {
	ssr: false,
	loading: () => <ExploreSkeleton />,
});
const CollectionStats = dynamic(() => import('@/components/pages/me/collection/stats'), {
	ssr: false,
	loading: () => <StatsSkeleton />,
});
const CollectionDetails = dynamic(() => import('@/components/pages/me/collection/details'), {
	ssr: false,
	loading: () => <DetailsSkeleton />,
});

export default function Page() {
	const params = useParams<{ id: string }>();

	const { collection } = useCollectionDetails(params.id);

	return (
		<div className="flex flex-col-reverse gap-4 mx-4">
			<div className="flex flex-col w-full gap-4">
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger value="overview">
							<Info className="w-4 h-4 mr-1" />
							<span>Overview</span>
						</TabsTrigger>
						<TabsTrigger value="explore">
							<FileSearch className="w-4 h-4 mr-1" />
							<span>Explore</span>
						</TabsTrigger>
						<TabsTrigger value="stats">
							<BarChart className="w-4 h-4 mr-1" />
							<span>Stats</span>
						</TabsTrigger>
						<TabsTrigger value='data'>
							<Table className='w-4 h-4 mr-1' />
							<span>Data</span>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-2">
						<CollectionOverview collection={collection} />
					</TabsContent>
					<TabsContent value="explore" className="space-y-2">
						<CollectionExplore />
					</TabsContent>
					<TabsContent value="stats" className="space-y-2">
						<CollectionStats />
					</TabsContent>
				</Tabs>
			</div>
			<div className="lg:sticky top-4 self-start flex flex-col gap-4 w-full">
				<CollectionDetails collection={collection} />
			</div>
		</div>
	);
}
