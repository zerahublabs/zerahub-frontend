import { useState } from 'react';
import { Card, CardContent, CardTitle } from './card';
import { AspectRatio } from './aspect-ratio';
import Image from 'next/image';
import { DatasetProps } from '@/constants/datasets';
import { Badge } from './badge';
import { Button } from './button';
import Link from 'next/link';

export function DatasetItem(props: { item: DatasetProps }) {
	const [hovered, setHovered] = useState(false);

	return (
		<Link href={`/dataset`} className="w-full">
			<Card
				className="mb-2 py-0 hover:cursor-pointer relative overflow-hidden"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
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
					<div className="lg:h-10">
						{hovered ? (
							<Button className="w-full">Details</Button>
						) : (
							<div
								className={`grid gap-2 grid-cols-2 lg:grid-cols-4 bg-neutral-200/30 p-2 rounded-2xl`}
							>
								<Badge variant={'outline'}>1 Files</Badge>
								<Badge variant={'outline'}>10k+</Badge>
								<Badge variant={'outline'} className='hidden md:block lg:block'>20 MB</Badge>
								<Badge variant={'outline'} className='hidden md:block lg:block'>CSV</Badge>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
