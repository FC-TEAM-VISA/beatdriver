/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
	},
};

module.exports = nextConfig;

// module.exports = {
// 	nextConfig,
// 	webpack: (config, { isServer }) => {
// 		// Fixes npm packages that depend on `fs` module
// 		if (!isServer) {
// 			config.node = {
// 				fs: "empty",
// 			};
// 		}

// 		return config;
// 	},
// };
