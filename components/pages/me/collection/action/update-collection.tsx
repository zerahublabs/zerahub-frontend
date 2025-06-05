import { Button } from '@/components/ui/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { useUpdateCollection } from '@/hooks/collections/use-update-collection';
import { useCollection } from '@/lib/features/collection/hooks';
import { EditIcon, LoaderCircle, Save } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export default function UpdateCollectionAction() {
	const formRef = useRef<HTMLFormElement>(null);
	const { isLoading, title, description, setTitle, setDescription, onSubmitHandler } =
		useUpdateCollection();
	const { collection } = useCollection();

	useEffect(() => {
		if (collection) {
			setTitle(collection.title);
			setDescription(collection.description);
		}
	}, [collection, setTitle, setDescription]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<EditIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Collection</DialogTitle>
				</DialogHeader>
				<form ref={formRef} onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full">
					<div className="flex flex-col gap-2">
						<Label htmlFor="dataset-name" className="text-sm font-semibold">
							Dataset Name
						</Label>
						<Input value={title} onChange={(e) => setTitle(e.target.value)} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="dataset-name" className="text-sm font-semibold">
							Description
						</Label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</form>
				<Button disabled={isLoading} onClick={() => formRef.current?.requestSubmit()}>
					{isLoading ? <LoaderCircle className="animate-spin" /> : <Save />}
					Save
				</Button>
			</DialogContent>
		</Dialog>
	);
}
