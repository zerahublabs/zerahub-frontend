export function bytesToMegabytes(bytes: number): string {
	const mb = bytes / (1024 * 1024);
	// Limit to 2 decimal places, remove trailing zeros
	return `${parseFloat(mb.toFixed(2))} Mb`;
}
