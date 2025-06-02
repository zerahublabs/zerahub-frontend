export enum ZERAHUB_CONTRACT_LIST {
	ZERAHUB_PAYMENT = 'ZERAHUB_PAYMENT',
	ZERAHUB_COLLECTION = 'ZERAHUB_COLLECTION'
}

export interface ZERAHUB_CONTRACT_TYPE {
	[key: string]: {
		address: string
	}
}

export const BASE_URL_API = "http://localhost:3001"

export const ZERAHUB_CONTRACTS: ZERAHUB_CONTRACT_TYPE = {
	[ZERAHUB_CONTRACT_LIST.ZERAHUB_PAYMENT]: {
		address: ''
	},
	[ZERAHUB_CONTRACT_LIST.ZERAHUB_COLLECTION]: {
		address: ''
	}
}
