import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dummyimage.com',
			},
			{
				protocol: 'https',
				hostname: 'source.boringavatars.com',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
			},
		],
	},
	/* config options here */
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:3001/:path*',
			},
			{
				source: '/static/:path*',
				destination: 'http://localhost:3001/static/:path*'
			}
		];
	},
};

export default nextConfig;
