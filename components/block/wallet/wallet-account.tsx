import React from 'react';
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';
import AvatarImage from 'boring-avatars';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function WalletAccount() {
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAppKitAccount();

    if (!isConnected) {
        return null;
    }

    return (
        <Drawer direction="right">
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
            <DrawerContent className="rounded-tl-2xl rounded-bl-2xl w-[100px] space-y-2 flex flex-col justify-between h-full">
                <div>
                    <DrawerHeader>
                        <DrawerTitle>Account</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 shrink-0">
                        <div className="flex items-center justify-between px-4">
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
                                <AlertDialogAction
                                    variant={'default'}
                                    onClick={() => disconnect()}
                                >
                                    Yes, sure!
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
