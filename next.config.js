/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Add polyfills
    config.module.rules.push({
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules\/(?!(core-js)\/).*/, 
    });

    return config;
  },
  experimental: {
    runtime: 'nodejs',
    legacyBrowserSupport: true,
  },
}

module.exports = nextConfig

}

module.exports = nextConfig
