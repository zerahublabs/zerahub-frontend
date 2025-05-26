import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateUsernameRequest } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';

export default function UpdateUsernameDialog(props: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}) {
	const { isOpen, setIsOpen } = props;
	const { isSuccess, loading, username, setUsername, sendUpdateRequest } =
		useUpdateUsernameRequest();

	useEffect(() => {
		if (isSuccess) {
			setIsOpen(false);
		}
	}, [isSuccess, setIsOpen]);

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
