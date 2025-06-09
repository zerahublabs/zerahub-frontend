import { Button } from '@/components/ui/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import Dropzone from '@/components/ui/shadcn/dropzone';
import { useUpdateCoverCollection } from '@/hooks/collections/use-update-collection';
import { Edit, LoaderCircle, Save } from 'lucide-react';
import React, { useRef } from 'react';

export default function UpdateCoverCollection() {
	const formRef = useRef<HTMLFormElement>(null);
	const { isLoading, onSubmitHandler } = useUpdateCoverCollection();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="absolute bg-black/0 w-full h-full transition duration-300 ease-in-out group-hover:bg-black/50 group-hover:cursor-pointer group-hover:backdrop-blur-sm">
					<div className="flex items-center justify-center w-full h-full">
						<Edit className="hidden transition duration-300 ease-in-out group-hover:block" />
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Cover</DialogTitle>
				</DialogHeader>
				<form
					ref={formRef}
					onSubmit={onSubmitHandler}
					className="flex flex-col gap-4 w-full"
				>
					<div className="flex flex-col gap-2 items-center w-full">
						<Dropzone onDrop={(e) => console.log(e)} />
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
