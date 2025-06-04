"use client"
import { Card, CardContent, CardTitle } from './card';
import { AspectRatio } from './aspect-ratio';
import Image from 'next/image';
import { Badge } from './badge';
import Link from 'next/link';
import { Skeleton } from './skeleton';
import { Collection } from '@/hooks/collections/use-collections';

export function DatasetSkeleton() {
	return (
		<Card className="mb-2 py-0 relative overflow-hidden transition-transform duration-300 ease-linear hover:cursor-pointer hover:-translate-y-1">
			<div className="overflow-hidden">
				<AspectRatio ratio={16 / 9}>
					<Skeleton className="w-full h-full" />
				</AspectRatio>
			</div>
			<CardContent className="flex flex-col gap-4 mb-4 shrink-0">
				<CardTitle className="text-muted-foreground">
					<Skeleton className="w-ful h-4" />
				</CardTitle>
				<div className="flex justify-between">
					<Skeleton className="w-full h-4" />
				</div>
				<div className="inline-flex gap-1">
					<Skeleton className="h-4 w-full" />
				</div>
			</CardContent>
		</Card>
	);
}

export default function DatasetItem(props: { item: Collection, url: string }) {
	return (
		<Link href={props.url}>
			<Card className="mb-2 py-0 relative overflow-hidden transition-transform duration-300 ease-linear hover:cursor-pointer hover:-translate-y-1">
				<div className="overflow-hidden">
					<AspectRatio ratio={16 / 9}>
						{props.item.cover !== null && (
							<Image
								fill
								src={`/static/${props.item.cover.filename}`}
								className="rounded-t-xl"
								alt="Random Dataset Cover"
							/>
						)}
					</AspectRatio>
				</div>
				<CardContent className="flex flex-col gap-4 mb-4 shrink-0">
					<CardTitle className="text-muted-foreground">
						{props.item.title.substring(0, 20)}...
					</CardTitle>
					<div className="flex justify-between">
						{
							props.item.price == 0 ? (
								<Badge>
									Free
								</Badge>
							) : (
								<small className="font-semibold text-sm text-primary">
									${props.item.price}
								</small>
							)
						}
					</div>
					<div className="inline-flex gap-1">
						<Badge variant={'outline'}>1 Files</Badge>
						<Badge variant={'outline'}>10k+</Badge>
						<Badge variant={'outline'} className="hidden md:block lg:block">
							20 MB
						</Badge>
						<Badge variant={'outline'} className="hidden md:block lg:block">
							CSV
						</Badge>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
