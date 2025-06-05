import { Button } from '@/components/ui/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { useSignCollection } from '@/hooks/collections/use-sign-collection';
import { LoaderCircle, Upload } from 'lucide-react';
import React, { useState } from 'react';

export default function SignCollectionAction() {
	const { isPending, onSignHandler } = useSignCollection();
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Sign Contract</Button>
			</DialogTrigger>
			<DialogContent className="w-sm">
				<DialogHeader>
					<DialogTitle>Confirm Sign Contract</DialogTitle>
					<DialogDescription>
						Are you sure you want to sign the contract?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button disabled={isPending} onClick={onSignHandler}>
						{isPending ? <LoaderCircle className="animate-spin" /> : <Upload />}
						Sign Contract
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
