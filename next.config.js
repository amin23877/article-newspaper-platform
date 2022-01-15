module.exports = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  swcminify: false,
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: 'http://158.255.74.155:4402/v1/:path*'
      }
    ]
  }
}
