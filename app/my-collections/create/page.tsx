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
import { LoaderCircle, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/shadcn/textarea';
import { useCreateCollection } from '@/hooks/collections/use-create-collection';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/shadcn/dialog';

export default function Page() {
	const {
		name,
		description,
		isLoading,
		isConfirmPushContract,
		setCover,
		setName,
		setDescription,
		onSubmitHandler,
	} = useCreateCollection();
	const formRef = useRef<HTMLFormElement>(null);

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
					<CardFooter className="w-full">
						<Button
							onClick={() => formRef.current?.requestSubmit()}
							disabled={isLoading}
							className="w-full"
						>
							{isLoading ? <LoaderCircle className="animate-spin" /> : <Save />}
							Create Dataset
						</Button>
					</CardFooter>
				</CardContent>
			</Card>

			<Dialog open={isConfirmPushContract}>
				<DialogContent className='w-sm'>
					<DialogHeader>
						<DialogTitle>
							Confirm Wallet
						</DialogTitle>
						<DialogDescription>
							You are about to register your dataset collection to the smart contract. This action requires a wallet transaction. Please review and confirm the transaction in your wallet when prompted.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button className='w-full'>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
