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
import { useUpdateUsernameRequest } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export default function UpdateUsernameDialog(props: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	setIsNeedsUpdateUsername: (needsUpdate: boolean) => void;
}) {
	const { isOpen, setIsOpen } = props;
	const { isSuccess, loading, username, setUsername, sendUpdateRequest } =
		useUpdateUsernameRequest();

	useEffect(() => {
		if (isSuccess) {
			setIsOpen(false);
		}
	}, [isSuccess, setIsOpen]);

	const onOpenChange = useCallback((open: boolean) => {
		console.log('open', open);
		console.log('username', username);
		if (!username) {
			toast.error('Please enter a username to complete your profile.');
			return;
		}
	}, [
		username
	])

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
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
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter className="flex-end">
					<Button disabled={loading} onClick={() => sendUpdateRequest()}>
						{loading && <LoaderCircle className="animate-spin" />} Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
