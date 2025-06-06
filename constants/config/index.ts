import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { bscTestnet, type AppKitNetwork } from '@reown/appkit/networks';
import { defineChain } from 'viem';

export const ZeraHubChain = /*#__PURE__*/ defineChain({
	id: 31337,
	name: 'ZeraHub',
	nativeCurrency: {
		decimals: 18,
		name: 'Ether',
		symbol: 'ETH',
	},
	rpcUrls: {
		default: { http: ['http://localhost:8451'] },
	},
});

// Get projectId from https://cloud.reown.com
export const projectId = "5e44d15a7f1e2cc9da5da15dd7d95e10"; // this is a public projectId only to use on localhost

if (!projectId) {
	throw new Error('Project ID is not defined');
}

export const networks = [ZeraHubChain, bscTestnet] as [AppKitNetwork, ...AppKitNetwork[]];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	projectId,
	networks,
});

export const config = wagmiAdapter.wagmiConfig;
