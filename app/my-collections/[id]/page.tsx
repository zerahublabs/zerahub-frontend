'use client';
import FileExplorer from '@/components/block/files/explorer/explorer';
import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/shadcn/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs';
import { BarChart, Info, Rows } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

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
						<Card>
							<CardHeader>
								<CardTitle>Summary</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
									id consequuntur hic possimus doloribus, nemo, error similique
									nulla, illum ullam fuga eius tempore eum molestiae earum
									distinctio? Voluptatem, dignissimos voluptatibus!
								</p>
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
										<small className="text-muted-foreground">
											Published At{' '}
										</small>
										{moment(new Date()).format('LLL')}
									</div>
									<div className="flex flex-col text-sm gap-1">
										<small className="text-muted-foreground">Publisher</small>{' '}
										<a href="#">0x0000...</a>
									</div>
									<div className="flex flex-col text-sm gap-1">
										<small className="text-muted-foreground">License</small>{' '}
										<a href="#">Free for Commercial Use</a>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="explore" className="space-y-2">
						<Card>
							<CardHeader>
								<CardTitle>Columns Description</CardTitle>
							</CardHeader>
							<CardContent>
								<Table className="border">
									<TableHeader>
										<TableRow>
											<TableHead>Column</TableHead>
											<TableHead>Description</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{[
											{ name: 'Name', description: 'Name of the dataset' },
											{ name: 'Size', description: 'Size of the dataset' },
											{ name: 'Type', description: 'Type of the dataset' },
											{ name: 'Price', description: 'Price of the dataset' },
										].map((item) => (
											<TableRow key={item.name}>
												<TableCell>{item.name}</TableCell>
												<TableCell>{item.description}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Dataset Files</CardTitle>
							</CardHeader>
							<CardContent>
								<Table className="border">
									<TableHeader>
										<TableRow>
											<TableHead>File Name</TableHead>
											<TableHead>Size</TableHead>
											<TableHead>Type</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{[
											{
												name: 'dataset.csv',
												size: '20 MB',
												type: 'CSV',
											},
											{
												name: 'dataset.json',
												size: '10 MB',
												type: 'JSON',
											},
										].map((item) => (
											<TableRow key={item.name}>
												<TableCell>{item.name}</TableCell>
												<TableCell>{item.size}</TableCell>
												<TableCell>{item.type}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Samples</CardTitle>
							</CardHeader>
							<CardContent>
								<Table className="border">
									<TableHeader>
										<TableRow>
											<TableHead>Sample</TableHead>
											<TableHead>Value</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{[
											{
												name: 'Sample 1',
												value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
											},
											{
												name: 'Sample 2',
												value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
											},
										].map((item) => (
											<TableRow key={item.name}>
												<TableCell>{item.name}</TableCell>
												<TableCell>{item.value}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						<FileExplorer />
					</TabsContent>
					<TabsContent value="stats" className="space-y-2">
						<Card>
							<CardHeader>
								<CardTitle>Payment Histories</CardTitle>
							</CardHeader>
							<CardContent>
								<Table className="border">
									<TableHeader>
										<TableRow>
											<TableHead>Transaction ID</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead>Date</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{[
											{
												id: '0x0000...',
												amount: '0.001 ETH',
												date: new Date(),
											},
											{
												id: '0x0001...',
												amount: '0.002 ETH',
												date: new Date(),
											},
										].map((item) => (
											<TableRow key={item.id}>
												<TableCell>{item.id}</TableCell>
												<TableCell>{item.amount}</TableCell>
												<TableCell>
													{moment(item.date).format('LLL')}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
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
