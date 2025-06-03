'use client';
import { Badge } from '@/components/ui/shadcn/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import moment from 'moment';
import React from 'react';

export default function Overview() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-sm">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa id
						consequuntur hic possimus doloribus, nemo, error similique nulla, illum
						ullam fuga eius tempore eum molestiae earum distinctio? Voluptatem,
						dignissimos voluptatibus!
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
							<small className="text-muted-foreground">Published At </small>
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
		</>
	);
}
