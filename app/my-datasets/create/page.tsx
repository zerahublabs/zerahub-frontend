import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

export default function Page() {
	return (
		<div className="flex w-full h-full p-4 flex-row gap-4 rounded-tl-2xl border">
			<div className="flex w-full flex-col gap-4 flex-1">
				<Card>
					<CardContent className="flex gap-2">
						<Button className="rounded-sm">Dataset Info</Button>
						<Button className="rounded-sm" variant={'outline'}>
							Upload Data
						</Button>
						<Button className="rounded-sm" variant={'outline'}>
							Sample Data
						</Button>
						<Button className="rounded-sm" variant={'outline'}>
							Pricing & Payments
						</Button>
						<Button className="rounded-sm" variant={'outline'}>
							Metadata
						</Button>
					</CardContent>
				</Card>
				<Card className="flex flex-1">
					<CardContent className="flex gap-6 flex-col justify-center items-center flex-1">
						<p className="text-muted-foreground text-sm text-center font-semibold">
							Dataset form here
						</p>
					</CardContent>
				</Card>
			</div>
			<Card className="w-[300px]">
				<CardContent className="flex gap-6 flex-col items-center flex-1">
					<div className="flex flex-col gap-6 w-full shrink-0 h-full">
						<div className="flex flex-col gap-6 flex-1">
							<div className="overflow-hidden">
								<AspectRatio ratio={16 / 9}>
									<Image
										src={'https://dummyimage.com/600x400/000/fff'}
										alt="Dataset Cover"
										fill
										className="rounded-xl object-cover"
									/>
								</AspectRatio>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<h1 className="text-2xl font-bold">-</h1>
									<div className="inline-flex gap-4 items-center">
										<h3 className="font-bold text-xl">0 ETH</h3>
										<h4 className="text-muted-foreground">$0</h4>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-semibold text-sm">Categories</h3>
									<div className="grid gap-2 grid-cols-4 bg-neutral-200/30 p-2 rounded-2xl divide-x">
										<Badge variant={'outline'}>-</Badge>
										{/* {[
											'Wiki',
											'Science',
											'History',
											'Data',
											'AI',
											'ML',
											'NLP',
											'Open',
										].map((category) => (
											<Badge
												key={category}
												variant={'outline'}
												className="justify-center flex items-center w-full"
											>
												{category}
											</Badge>
										))} */}
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-semibold text-sm">License</h3>
									<p className="text-muted-foreground text-sm p-2 rounded-2xl bg-neutral-200/30">
										<a href="#">-</a>
									</p>
								</div>
							</div>
						</div>
						<Button className="w-full mt-auto">Create Dataset</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
