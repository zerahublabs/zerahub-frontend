'use client';
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { useCollection } from '@/lib/features/collection/hooks';
import { Edit } from 'lucide-react';
import moment from 'moment';
import React from 'react';

export function OverviewSkeleton() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>
						<CardTitle>Summary</CardTitle>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="w-full h-48" />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Dataset Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col text-sm gap-1">
							<small className="text-muted-foreground">Categories</small>{' '}
							<Skeleton className="w-full h-8" />
						</div>
						<div className="flex flex-col text-sm gap-1">
							<small className="text-muted-foreground">Published At </small>
							<Skeleton className="w-full h-8" />
						</div>
						<div className="flex flex-col text-sm gap-1">
							<small className="text-muted-foreground">Publisher</small>{' '}
							<Skeleton className="w-full h-8" />
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default function Overview() {
	const { collection } = useCollection();

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader className="inline-flex justify-between items-center">
					<CardTitle>Summary</CardTitle>
					<Button variant={'outline'} size={'icon'}>
						<Edit />
					</Button>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-sm">{collection?.description}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="inline-flex justify-between items-center">
					<CardTitle>Dataset Summary</CardTitle>
					<Button variant={'outline'} size={'icon'}>
						<Edit />
					</Button>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col text-sm gap-1">
							<small className="text-muted-foreground">Categories</small>{' '}
							<div className="grid gap-2 grid-cols-6 rounded-2xl divide-x">
								{[
									'Wiki',
									'Science',
									'History',
									'Data',
									'AI',
									'ML',
									'NLP',
									'Open Source',
								].map((category) => (
									<Badge
										key={category}
										variant={'outline'}
										className="justify-center flex items-center w-full"
									>
										{category}
									</Badge>
								))}
							</div>
						</div>
						<div className="flex flex-col text-sm gap-1">
							<small className="text-muted-foreground">Published At </small>
							{moment(collection?.createdAt).format('LL')}
						</div>
						<div className="flex flex-col text-sm gap-1">
							<small className="text-muted-foreground">Publisher</small>
							<a href="#">{collection?.publisher}</a>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
