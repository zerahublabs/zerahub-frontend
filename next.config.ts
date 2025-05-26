import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: ['dummyimage.com', 'source.boringavatars.com', 'placehold.co'],
	},
	/* config options here */
	async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/api/:path*',
            },
        ];
    },
};

export default nextConfig;
