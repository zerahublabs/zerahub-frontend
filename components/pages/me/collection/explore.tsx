import FileExplorer from '@/components/block/files/explorer/explorer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/shadcn/table';
import React from 'react';

export function ExploreSkeleton() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Columns Description</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="w-full h-48" />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Dataset Files</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="w-full h-48" />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Samples</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="w-full h-48" />
				</CardContent>
			</Card>
			<FileExplorer />
		</>
	);
}

export default function Explore() {
	return (
		<div className="space-y-4">
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
		</div>
	);
}
