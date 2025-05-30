'use client';
import { useMe } from '@/hooks/use-me';
import { useEffect, useState } from 'react';
import UpdateUsernameDialog from '../block/dialogs/update-username';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/shadcn/alert-dialog';
import { useAppKitAccount } from '@reown/appkit/react';

export default function UsernameProvider() {
    const { isConnected } = useAppKitAccount();
    const { username } = useMe();
    const [mounted, setMounted] = useState(false);
    const [isNeedsUpdateUsername, setIsNeedsUpdateUsername] = useState<boolean>(false);
    const [showUsernameAlert, setShowUsernameAlert] = useState<boolean>(false);

    // Handle initial mount
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !isConnected) {
            setIsNeedsUpdateUsername(false);
            return;
        }

        // Only open the dialog if username is null and we haven't shown it yet
        if (username === null && !isNeedsUpdateUsername) {
            setIsNeedsUpdateUsername(true);
        } else if (isNeedsUpdateUsername && username && username.trim() !== '') {
            setIsNeedsUpdateUsername(false);
            setShowUsernameAlert(false);
        }
    }, [username, isNeedsUpdateUsername, mounted, isConnected]);

    const handleUsernameDialogClose = () => {
        if (!username || username.trim() === '') {
            setShowUsernameAlert(true);
        }
        setIsNeedsUpdateUsername(false);
    };

    // Don't render anything on server or before client mount
    if (!mounted) return null;

    return (
        <>
            <UpdateUsernameDialog
                isOpen={isNeedsUpdateUsername}
                setIsOpen={handleUsernameDialogClose}
                setIsNeedsUpdateUsername={setIsNeedsUpdateUsername}
            />

            <AlertDialog open={showUsernameAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Username Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            You need to set a username to continue using the platform.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsNeedsUpdateUsername(true)}>
                            Update Username
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
