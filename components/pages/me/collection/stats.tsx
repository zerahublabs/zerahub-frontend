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
import moment from 'moment';
import React from 'react';

export function StatsSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Histories</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="w-full h-48" />
			</CardContent>
		</Card>
	);
}

export default function Stats() {
	return (
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
								<TableCell>{moment(item.date).format('LLL')}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
