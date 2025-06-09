import FileExplorer from '@/components/pages/me/collection/files/explorer/explorer';
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
		<>
			<FileExplorer />
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
		</>
	);
}
