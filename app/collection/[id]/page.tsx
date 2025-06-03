'use client'
import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent} from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs';
import { BarChart, Info, Rows } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

const CollectionOverview = dynamic(() => import("@/components/pages/collection/overview"), { ssr: false })
const CollectionExplore = dynamic(() => import("@/components/pages/collection/explore"), { ssr: false })
const CollectionStats = dynamic(() => import("@/components/pages/collection/stats"), { ssr: false })

export default function Page() {

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
				<Card className="w-[300px]">
					<CardContent>
						<div className="flex flex-col gap-6">
							<div className="overflow-hidden">
								<AspectRatio ratio={16 / 9}>
									<Badge className="absolute top-2 left-2 z-10" variant="default">
										Purchased
									</Badge>
									<Image
										src={
											'https://dummyimage.com/600x400/000/fff&text=Wikipedia+Datasets'
										}
										alt="Gambar"
										fill
										className="rounded-xl object-cover"
									/>
								</AspectRatio>
							</div>
							<div className="flex flex-col w-full gap-4">
								<h1 className="text-2xl font-bold">Wikipedia Datasets</h1>
								<Separator />
								<div className="flex flex-col gap-4">
									<div className="inline-flex gap-4">
										<div className="inline-flex gap-1">
											<h3 className="font-bold text-xl text-primary">0.001</h3>
											<small className="text-muted-foreground">ETH</small>
										</div>
									</div>
									<div className={`flex flex-col gap-4 w-full p-2 rounded-2xl`}>
										<div className="flex flex-col text-sm gap-1">
											<small className="text-muted-foreground">
												Total Files
											</small>
											1 Files
										</div>
										<div className="flex flex-col text-sm gap-1">
											<small className="text-muted-foreground">
												Total Rows
											</small>
											10k+
										</div>
										<div className="flex flex-col text-sm gap-1">
											<small className="text-muted-foreground">
												Size of File
											</small>
											20 MB
										</div>
										<div className="flex flex-col text-sm gap-1">
											<small className="text-muted-foreground">Type</small>
											Tabular
										</div>
									</div>
									{/* <Button>Buy Dataset</Button> */}
									<Button>Download Dataset</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
