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
import { useCollection } from '@/lib/features/collection/hooks';
import { Label } from '@/components/ui/shadcn/label';
import { Input } from '@/components/ui/shadcn/input';

export default function SignCollectionAction() {
	const { isPending, collectionPrice, setCollectionPrice, onSignHandler } = useSignCollection();
	const { collection } = useCollection();
	const [isOpen, setIsOpen] = useState(false);

	if (!collection) {
		return null; // Don't render the button if collection is not loaded
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button disabled={!collection || collection.transactionHash !== null}>
					{collection.transactionHash !== null ? 'Already Signed' : 'Sign Contract'}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-md">
				<DialogHeader>
					<DialogTitle>Confirm Sign Contract</DialogTitle>
					<DialogDescription>
						Are you sure you want to sign the contract for collection &quot;
						{collection.title}&quot;? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="price">Collection Price</Label>
						<Input
							type="number"
							inputMode="numeric"
							placeholder="e.g: 20"
							value={collectionPrice}
							onChange={(e) => setCollectionPrice(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={async () => {
							await onSignHandler();
							setIsOpen(false);
						}}
					>
						{isPending ? (
							<LoaderCircle className="animate-spin mr-2" />
						) : (
							<Upload className="mr-2" />
						)}
						{isPending ? 'Signing...' : 'Sign Contract'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
