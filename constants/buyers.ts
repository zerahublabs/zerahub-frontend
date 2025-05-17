import { dataset_samples, DatasetProps } from './datasets';

export interface BuyerProps {
	address: string;
	dataset: DatasetProps;
	timestamp: Date;
}

const seed = 12345;
function seededRandom(seed: number) {
	let value = seed;
	return function () {
		value = (value * 9301 + 49297) % 233280;
		return value / 233280;
	};
}
const rand = seededRandom(seed);

function seededRandomEvmWallet(): string {
	const hex = Array.from({ length: 40 }, () => Math.floor(rand() * 16).toString(16)).join('');
	return `0x${hex}`;
}

export const buyer_samples: BuyerProps[] = [
	...Array.from({ length: 100 }).map((_, i) => ({
		address: seededRandomEvmWallet(),
		dataset: dataset_samples[i % dataset_samples.length],
		// Use a fixed base timestamp for deterministic SSR/CSR rendering
		timestamp: new Date(1700000000000 - Math.floor(rand() * 100000000)),
	})),
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
