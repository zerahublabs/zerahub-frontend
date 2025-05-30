'use client';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import WelcomeSign from '../block/dialogs/welcome-sign';
import { useAppKitAccount } from '@reown/appkit/react';

export default function WelcomeSignProvider() {
    const { isConnected } = useAppKitAccount();
    const { token } = useAuth();

    useEffect(() => {
        if (isConnected && !token) {
            // The setShownSignMessage is now handled in clearToken() when token becomes invalid
            return;
        }
    }, [isConnected, token]);

    return <WelcomeSign />;
}
