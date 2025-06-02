import { Card, CardContent, CardTitle } from './card';
import { AspectRatio } from './aspect-ratio';
import Image from 'next/image';
import { DatasetProps } from '@/constants/datasets';
import { Badge } from './badge';
import Link from 'next/link';

export function DatasetItem(props: { item: DatasetProps }) {
	return (
		<Link href={`/dataset?id=${props.item.title}`}>
			<Card
				className="mb-2 py-0 relative overflow-hidden transition-transform duration-300 ease-linear hover:cursor-pointer hover:-translate-y-1"
			>
				<div className="overflow-hidden">
					<AspectRatio ratio={16 / 9}>
						<Image
							fill
							src={`https://dummyimage.com/600x400/000/fff&text=${props.item.title}`}
							className="rounded-t-xl"
							alt="Random Dataset Cover"
						/>
					</AspectRatio>
				</div>
				<CardContent className="flex flex-col gap-4 mb-4 shrink-0">
					<CardTitle className="text-muted-foreground">
						{props.item.title.substring(0, 20)}...
					</CardTitle>
					<div className="flex justify-between">
						<small className="font-semibold text-sm text-primary">
							{props.item.price}
						</small>
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
