/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
