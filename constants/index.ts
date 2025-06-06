import { Abi } from 'viem';
import ArtifactCollection from '@/constants/abi/ZeraHubCollection.json';

export enum ZERAHUB_CONTRACT_LIST {
	ZERAHUB_PAYMENT = 'ZERAHUB_PAYMENT',
	ZERAHUB_COLLECTION = 'ZERAHUB_COLLECTION',
	ZERAHUB_TOKEN = 'ZERAHUB_TOKEN',
}

export const BASE_URL_API = 'http://localhost:3001';

// ZeraHub Testnet
// export const ZERAHUB_CONTRACTS: ZERAHUB_CONTRACT_TYPE = {
// 	[ZERAHUB_CONTRACT_LIST.ZERAHUB_PAYMENT]: {
// 		address: '0x8F0342A7060e76dfc7F6e9dEbfAD9b9eC919952c',
// 		abi: ArtifactCollection.abi as Abi,
// 	},
// 	[ZERAHUB_CONTRACT_LIST.ZERAHUB_COLLECTION]: {
// 		address: '0x9f9F5Fd89ad648f2C000C954d8d9C87743243eC5',
// 		abi: ArtifactCollection.abi as Abi,
// 	},
// 	[ZERAHUB_CONTRACT_LIST.ZERAHUB_TOKEN]: {
// 		address: '0x0643D39D47CF0ea95Dbea69Bf11a7F8C4Bc34968',
// 		abi: ArtifactCollection.abi as Abi,
// 	},
// };
export const ZERAHUB_CONTRACTS = {
	"31337": {
		payment: {
			address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
			abi: ArtifactCollection.abi as Abi,
		},
		collection: {
			address: '0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8',
			abi: ArtifactCollection.abi as Abi,
		},
		token: {
			address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
			abi: ArtifactCollection.abi as Abi,
		},
	},
	"97": {
		token: {
			address: '0x907FE355e1c15fD76ca4ee77e066634dCae0B51C',
			abi: ArtifactCollection.abi as Abi,
		},
		payment: {
			address: '0xa51659dF1f538500870f2561631F1AA621aED482',
			abi: ArtifactCollection.abi as Abi,
		},
		collection: {
			address: '0xfE488afadD7836b58b8cAb8B58f757d8d0F9f6B2',
			abi: ArtifactCollection.abi as Abi,
		},
	}
};
