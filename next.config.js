/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
	},
	// webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	// 	config.node = {
	// 		fs: "empty",
	// 	};
	// 	return config;
	// },
};

module.exports = nextConfig;
