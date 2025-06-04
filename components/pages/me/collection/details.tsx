import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import { Collection } from '@/hooks/collections/use-collections';
import { useSignCollection } from '@/hooks/collections/use-sign-collection';
import { ClipboardIcon, LoaderCircle, Pencil, Upload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export function DetailsSkeleton() {
	return (
		<Card className="w-full">
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

export function DetailsAction({ collection }: { collection?: Collection }) {
	const { isPending: isSignCollectionPending, onSignHandler } = useSignCollection(collection);

	if (collection?.transactionHash == null) {
		return (
			<Button disabled={isSignCollectionPending} onClick={onSignHandler}>
				{isSignCollectionPending ? <LoaderCircle className="animate-spin" /> : <Upload />}
				Sign Contract
			</Button>
		);
	} else if (collection.transactionHash && collection.status === 'DRAFT') {
		return <Button disabled>Publish Now</Button>;
	} else {
		return <Button disabled>Archieve Now</Button>;
	}
}

export default function Details({ collection }: { collection?: Collection }) {
	return (
		<Card className="w-full">
			<CardContent>
				<div className="flex flex-col lg:flex-row gap-6 items-center">
					<div className="overflow-hidden w-full h-full">
						<AspectRatio ratio={16 / 9}>
							<Image
								src={`/static/${collection?.cover.filename}`}
								alt="Gambar"
								fill
								className="rounded-xl object-cover"
							/>
						</AspectRatio>
					</div>
					<div className="flex flex-col w-full gap-4">
						<div className="flex w-full flex-row items-center justify-between gap-2">
							<h1 className="text-2xl font-bold">{collection?.title}</h1>
							<Button variant={'link'}>
								<Pencil className="size-3" />
							</Button>
						</div>
						<Separator />
						<div className="flex flex-col gap-4">
							<div className="inline-flex gap-4">
								<div className="inline-flex gap-1">
									<h3 className="font-bold text-xl text-primary">0</h3>
									<small className="text-muted-foreground">ETH</small>
								</div>
							</div>
							<div className={`flex flex-row gap-4 w-full p-2 rounded-2xl`}>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Total Files</small>
									<span>-</span>
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Total Rows</small>
									<span>-</span>
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Size of File</small>
									<span>-</span>
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Type</small>
									<span>-</span>
								</div>
								<div className="flex flex-col text-sm gap-1">
									<small className="text-muted-foreground">Contract</small>
									{collection?.transactionHash === null ? (
										<Badge variant={'outline'}>No Contract</Badge>
									) : (
										<Tooltip>
											<TooltipTrigger>
												<Badge
													variant={'outline'}
													className="space-x-4 hover:cursor-pointer"
												>
													{collection?.transactionHash.substring(0, 4)}...
													{collection?.transactionHash.substring(
														collection.transactionHash.length - 4,
														collection.transactionHash.length,
													)}
													<ClipboardIcon />
												</Badge>
											</TooltipTrigger>
											<TooltipContent>Copy</TooltipContent>
										</Tooltip>
									)}
								</div>
							</div>
							<DetailsAction collection={collection} />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
