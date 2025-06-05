'use client';
import { DetailsSkeleton } from '@/components/pages/collection/details';
import { ExploreSkeleton } from '@/components/pages/collection/explore';
import { OverviewSkeleton } from '@/components/pages/collection/overview';
import { StatsSkeleton } from '@/components/pages/collection/stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs';
import { BarChart, Info, Rows } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const CollectionOverview = dynamic(() => import('@/components/pages/collection/overview'), {
	ssr: false,
	loading: () => <OverviewSkeleton />,
});
const CollectionExplore = dynamic(() => import('@/components/pages/collection/explore'), {
	ssr: false,
	loading: () => <ExploreSkeleton />,
});
const CollectionStats = dynamic(() => import('@/components/pages/collection/stats'), {
	ssr: false,
	loading: () => <StatsSkeleton />,
});
const CollectionDetails = dynamic(() => import('@/components/pages/collection/details'), {
	ssr: false,
	loading: () => <DetailsSkeleton />,
});

export default function Page() {
	const params = useParams<{ id: string }>();

	return (
		<div className="flex w-full flex-col-reverse lg:flex-row gap-4">
			<div className="flex flex-col w-full gap-4">
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger value="overview">
							<Info className="w-4 h-4 mr-1" />
							Overview
						</TabsTrigger>
						<TabsTrigger value="explore">
							<Rows className="w-4 h-4 mr-1" />
							Explore
						</TabsTrigger>
						<TabsTrigger value="stats">
							<BarChart className="w-4 h-4 mr-1" />
							Stats
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-2">
						<CollectionOverview />
					</TabsContent>
					<TabsContent value="explore" className="space-y-2">
						<CollectionExplore />
					</TabsContent>
					<TabsContent value="stats" className="space-y-2">
						<CollectionStats />
					</TabsContent>
				</Tabs>
			</div>
			<div className="lg:sticky top-4 self-start flex flex-col gap-4 w-full lg:w-[300px]">
				<CollectionDetails slug={params.id} />
			</div>
		</div>
	);
}
