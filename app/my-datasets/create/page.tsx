'use client';
import { Button } from '@/components/ui/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/shadcn/card';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { Separator } from '@/components/ui/shadcn/separator';
import Dropzone from '@/components/ui/shadcn/dropzone';
import { Save } from 'lucide-react';
import { Textarea } from '@/components/ui/shadcn/textarea';

export default function Page() {
	return (
		<div className="flex flex-col w-full h-full gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Publish your Datasets</CardTitle>
					<CardDescription>
						Fill in the dataset information below. This will be used to create the
						dataset on the blockchain.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-6 flex-col justify-start items-center flex-1">
					<form className="flex flex-col gap-6 w-full">
						<div className="flex flex-col gap-2">
							<Label htmlFor="dataset-banner" className="text-sm font-semibold">
								Dataset Banner
							</Label>
							<Dropzone />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="dataset-name" className="text-sm font-semibold">
								Dataset Name
							</Label>
							<Input />
						</div>
						<div className="flex flex-col gap-2 h-[100px]">
							<Label htmlFor="dataset-name" className="text-sm font-semibold">
								Description
							</Label>
							<Textarea
								className='h-full'
							/>
						</div>
					</form>
					<Separator />
					<CardFooter className="w-full">
						<Button className="w-full">
							<Save />
							Create Dataset
						</Button>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	);
}
