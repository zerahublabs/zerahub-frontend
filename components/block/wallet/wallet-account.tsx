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
import { AppKitNetwork } from '@reown/appkit/networks';
import { useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/react';
import { useBalance } from 'wagmi';
import { formatEther, zeroAddress } from 'viem';
import { CheckIcon, LoaderCircle, UserIcon } from 'lucide-react';
import { networks } from '@/constants/config';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { useCallback, useState } from 'react';

export default function WalletAccount() {
	const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);

	const { isConnected, address } = useAppKitAccount();
	const { chainId, switchNetwork } = useAppKitNetwork();
	const { data: balance } = useBalance({
		address: zeroAddress,
	});

	const { disconnect } = useDisconnect();
	const username = 'catdoom';

	const handleSwitchNetwork = useCallback((network: AppKitNetwork) => {
		setIsSwitchingNetwork(true);
		switchNetwork(network);
		setIsSwitchingNetwork(false);
	}, [switchNetwork]);

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
								<p className="text-sm text-muted-foreground">
									{formatEther(balance?.value ?? BigInt(0), 'wei').split('.')[0]} {'\n'}
									{networks.find((n) => n.id === chainId)?.nativeCurrency.symbol}
								</p>
							</div>
						</div>
						<Badge>Connected</Badge>
					</div>
					<div className="flex items-center justify-between px-4">
						<p className="text-sm text-muted-foreground">Network</p>
						<Badge variant={'outline'}>
							{networks.find((n) => n.id === chainId)?.name}
						</Badge>
					</div>
				</div>
				<DrawerFooter>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant={'outline'} className="w-full">
								Switch Network
							</Button>
						</DialogTrigger>
						<DialogContent className="w-sm">
							<DialogHeader>
								<DialogTitle>Switch Network</DialogTitle>
								<DialogDescription>
									Switch to a different network to interact with the app.
								</DialogDescription>
							</DialogHeader>
							<div className="flex flex-col gap-2">
								{networks.map((network) => (
									<div
										className="inline-flex p-4 justify-between items-center border rounded-md hover:cursor-pointer"
										key={network.id}
										onClick={() => handleSwitchNetwork(network as AppKitNetwork)}
									>
										<p className="text-sm">{network.name}</p>
										{network.id === chainId && !isSwitchingNetwork && !isSwitchingNetwork && (
											<CheckIcon className="w-4 h-4 text-muted-foreground" />
										)}
										{isSwitchingNetwork && network.id === chainId && (
											<LoaderCircle className="w-4 h-4 animate-spin text-muted-foreground" />
										)}
									</div>
								))}
							</div>
						</DialogContent>
					</Dialog>
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
