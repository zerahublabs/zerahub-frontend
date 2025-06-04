'use client';
import { Button } from '@/components/ui/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/shadcn/card';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { Separator } from '@/components/ui/shadcn/separator';
import Dropzone from '@/components/ui/shadcn/dropzone';
import { LoaderCircle, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/shadcn/textarea';
import { useCreateCollection } from '@/hooks/collections/use-create-collection';
import { useRef } from 'react';

export default function Page() {
	const { name, description, isLoading, setCover, setName, setDescription, onSubmitHandler } =
		useCreateCollection();
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<div className="flex flex-col h-full justify-center mx-4 gap-4">
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Publish your Collections</CardTitle>
					<CardDescription>
						Fill in the dataset information below. This will be used to create the
						dataset on the blockchain.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-4 flex-col justify-start items-center flex-1">
					<form
						ref={formRef}
						onSubmit={onSubmitHandler}
						className="flex flex-col gap-6 w-full"
					>
						<div className="flex flex-col gap-2">
							<Label htmlFor="dataset-banner" className="text-sm font-semibold">
								Dataset Banner
							</Label>
							<Dropzone onAcceptFile={setCover} />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="dataset-name" className="text-sm font-semibold">
								Dataset Name
							</Label>
							<Input value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="flex flex-col gap-2 h-[100px]">
							<Label htmlFor="dataset-name" className="text-sm font-semibold">
								Description
							</Label>
							<Textarea
								className="h-full"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</form>
					<Separator />
					<Button
						onClick={() => formRef.current?.requestSubmit()}
						disabled={isLoading}
						className="w-full"
					>
						{isLoading ? <LoaderCircle className="animate-spin" /> : <Save />}
						Create Dataset
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
