export function generateRandomNonce(length = 16) {
	const chars = 'abcdef0123456789';
	let nonce = '';
	for (let i = 0; i < length; i++) {
		nonce += chars[Math.floor(Math.random() * chars.length)];
	}
	return nonce;
}
