/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = { 
  swcMinify: true,
  sassOptions: {
  includePaths: [path.join(__dirname, '/src/styles/')],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.(frag|vert)$/, // .frag と .vert ファイルを処理
      use: ['raw-loader', 'glslify-loader'],
    }
    );
    return config;
  },
  images: {
    domains: ['images.microcms-assets.io'], // 許可するホスト名を指定
  },
}

module.exports = nextConfig
