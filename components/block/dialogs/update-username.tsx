import { Button } from '@/components/ui/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function UpdateUsernameDialog(props: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	setIsNeedsUpdateUsername: (needsUpdate: boolean) => void;
}) {
	const [username, setUsername] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { isOpen, setIsOpen } = props;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update</DialogTitle>
					<DialogDescription>
						Please enter a username to complete your profile.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username">Username</Label>
						<Input
							className="col-span-3"
							value={""}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter className="flex-end">
					<Button disabled={isLoading} onClick={() => console.log('ok')}>
						{isLoading && <LoaderCircle className="animate-spin" />} Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
