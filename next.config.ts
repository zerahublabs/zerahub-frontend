import type { NextConfig } from 'next';

const API_BASE_URL =
	process.env.NODE_ENV == 'production'
		? process.env.API_BASE_URL
		: 'https://api-stagging.zerahub.io';

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
				destination: `${API_BASE_URL}/:path*`,
			},
			{
				source: '/static/:path*',
				destination: `${API_BASE_URL}/static/:path*`,
			},
		];
	},
};

export default nextConfig;
