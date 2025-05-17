'use client';

import { wagmiAdapter, projectId, networks } from '@/constants/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
    name: 'next-reown-appkit',
    description: 'next-reown-appkit',
    url: 'https://localhost',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Create the modal
export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    metadata,
    themeMode: 'light',
    features: {
        analytics: true,
        connectMethodsOrder: ['wallet'],
    },
    enableWalletConnect: false,
    themeVariables: {
        '--w3m-accent': '#000000',
    },
});

function WalletContextProvider({
    children,
    cookies,
}: {
    children: ReactNode;
    cookies: string | null;
}) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}

export default WalletContextProvider;
