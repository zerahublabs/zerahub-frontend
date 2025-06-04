'use client';
import { Button } from '@/components/ui/shadcn/button';
import AvatarImage from 'boring-avatars';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
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
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useBalance } from 'wagmi';
import { formatEther, zeroAddress } from 'viem';
import { UserIcon } from 'lucide-react';

export default function WalletAccount() {
	const { isConnected, address } = useAppKitAccount();
	const balance = useBalance({
		address: zeroAddress
	})
	const { disconnect } = useDisconnect();
	const username = 'catdoom';

	if (!isConnected) {
		return null;
	}

	return (
		<Drawer direction={'right'}>
			<DrawerTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<div className="flex items-center">
						<UserIcon />
					</div>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="rounded-tl-2xl rounded-bl-2xl gap-4 px-2">
				<DrawerHeader>
					<DrawerTitle>Account</DrawerTitle>
					<DrawerDescription>Manage your wallet account and settings.</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between px-4 pb-2">
						<div className="inline-flex items-center gap-4">
							<AvatarImage string={address} size={40} />
							<div className="flex flex-col justify-center">
								<p className="font-semibold text-foreground">
									{username || address?.substring(0, 8)}...
								</p>
								<p className="text-sm text-muted-foreground">{formatEther(BigInt(balance.data?.value.toString() ?? "0"), 'wei')} ETH</p>
							</div>
						</div>
						<Badge>Connected</Badge>
					</div>
					<div className="flex items-center justify-between px-4">
						<p className="text-sm text-muted-foreground">Network</p>
						<Badge variant={'outline'}>Ethereum</Badge>
					</div>
				</div>
				<DrawerFooter>
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
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
