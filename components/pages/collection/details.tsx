import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { useCollectionDetails } from '@/hooks/collections/use-collections';
import { useCollection } from '@/lib/features/collection/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

export function DetailsSkeleton() {
	return (
		<Card className="w-full lg:w-[300px]">
			<CardContent>
				<div className="flex flex-col gap-6">
					<div className="overflow-hidden">
						<AspectRatio ratio={16 / 9}>
							<Skeleton className="w-full h-full" />
						</AspectRatio>
					</div>
					<div className="flex flex-col w-full gap-4">
						<Skeleton className="w-full h-12" />
						<Separator />
						<div className="flex flex-col gap-4">
							<div className="inline-flex gap-4">
								<div className="inline-flex gap-1">
									<Skeleton className="w-full h-8" />
								</div>
							</div>
							<div className={`flex flex-col gap-4 w-full p-2 rounded-2xl`}>
								<div className="flex flex-col text-sm gap-1">
									<Skeleton className="w-full h-4" />
								</div>
								<div className="flex flex-col text-sm gap-1">
									<Skeleton className="w-full h-4" />
								</div>
								<div className="flex flex-col text-sm gap-1">
									<Skeleton className="w-full h-4" />
								</div>
								<div className="flex flex-col text-sm gap-1">
									<Skeleton className="w-full h-4" />
								</div>
							</div>
							<Skeleton className="w-full h-full" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function Details(props: { slug: string }) {
	useCollectionDetails(props.slug);

	const [isImageLoaded, setIsImageLoaded] = React.useState(false);
	const { collection } = useCollection();

	return (
		<Card className="w-full lg:w-[300px]">
			<CardContent>
				<div className="flex flex-col gap-6">
					<div className="overflow-hidden">
						<AspectRatio ratio={16 / 9}>
							{!isImageLoaded && (
								<div className="absolute inset-0 flex items-center justify-center">
									<Skeleton className="w-full h-full" />
								</div>
							)}
							<Image
								src={`/static/s3/cover/${collection?.cover.id}`}
								alt="Gambar"
								fill
								className={cn(
									'rounded-xl object-cover',
									isImageLoaded ? 'opacity-100' : 'opacity-0',
								)}
								loading="eager"
								loader={() => `/static/s3/cover/${collection?.cover.id}`}
								onLoadingComplete={() => setIsImageLoaded(true)}
							/>
						</AspectRatio>
					</div>
					<div className="flex flex-col w-full gap-4">
						<h1 className="text-2xl font-bold">{collection?.title}</h1>
						<Separator />
						<div className="flex flex-col gap-4">
							<div className="inline-flex gap-4">
								<div className="inline-flex gap-1">
									<small className="text-muted-foreground">$</small>
									<h3 className="font-bold text-xl text-primary">200</h3>
								</div>
							</div>
							<div className={`flex flex-col gap-4 w-full p-2 rounded-2xl`}>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Total Files</small>1
									Files
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Total Rows</small>
									10k+
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Size of File</small>
									20 MB
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Type</small>
									Tabular
								</div>
							</div>
							<Button>Buy Now</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
