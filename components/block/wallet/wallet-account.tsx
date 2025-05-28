'use client';
import { Button } from '@/components/ui/shadcn/button';
import AvatarImage from 'boring-avatars';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/shadcn/drawer';
import { Badge } from '@/components/ui/shadcn/badge';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/shadcn/alert-dialog';
import { Separator } from '@/components/ui/shadcn/separator';
import { useAuth } from '@/hooks/use-auth';
import { useMe } from '@/hooks/use-me';
import { useEffect, useState } from 'react';
import UpdateUsernameDialog from '../dialogs/update-username';

export default function WalletAccount() {
	const { isConnected, address, disconnect } = useAuth();
	const { username } = useMe();
	const [isNeedsUpdateUsername, setIsNeedsUpdateUsername] = useState<boolean>(false);

	useEffect(() => {
		if (isConnected && (!username || username.trim() === '') && !isNeedsUpdateUsername) {
			setIsNeedsUpdateUsername(true);
		} else if (isNeedsUpdateUsername && username && username.trim() !== '') {
			setIsNeedsUpdateUsername(false);
		}
	}, [username, isConnected, isNeedsUpdateUsername]);

	if (!isConnected) {
		return null;
	}

	return (
		<Drawer direction={'bottom'}>
			<DrawerTrigger asChild>
				<Button variant={'outline'}>
					<div className="flex items-center gap-2">
						<AvatarImage string={address} size={40} className="w-40 h-40" />
						<span className="text-sm font-medium text-foreground">
							{address?.substring(0, 8)}...
						</span>
					</div>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="rounded-tl-2xl rounded-bl-2xl w-1/2 flex flex-col gap-4 justify-between pb-2 px-2">
				<DrawerHeader>
					<DrawerTitle>Account</DrawerTitle>
					<DrawerDescription>
						Manage your wallet account and settings.
					</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4 shrink-0">
					<div className="flex items-center justify-between px-4 pb-2">
						<div className="inline-flex items-center gap-4">
							<AvatarImage string={address} size={40} />
							<div className="flex flex-col justify-center">
								<p className="font-semibold text-foreground">
									{address?.substring(0, 8)}...
								</p>
								<p className="text-sm text-muted-foreground">1 ETH</p>
							</div>
						</div>
						<Badge>Connected</Badge>
					</div>
					<Separator orientation={'vertical'} />
					<div className="flex items-center justify-between px-4">
						<p className="text-sm text-muted-foreground">Network</p>
						<Badge variant={'outline'}>Ethereum</Badge>
					</div>
				</div>
				<div className="px-4 pb-4">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant={'default'} className="w-full">
								Disconnect
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="w-[400px]">
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction variant={'default'} onClick={() => disconnect()}>
									Yes, sure!
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<UpdateUsernameDialog
						isOpen={isNeedsUpdateUsername}
						setIsOpen={setIsNeedsUpdateUsername}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
