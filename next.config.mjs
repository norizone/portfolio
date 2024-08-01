import path from 'path'
import { fileURLToPath } from 'url'

// ESモジュールでは __dirname は使えないため、以下の方法で現在のディレクトリを取得
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, '/src/styles/')],
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(frag|vert)$/, // .frag と .vert ファイルを処理
        use: ['raw-loader', 'glslify-loader'],
      }
    )
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.AWS_S3_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
