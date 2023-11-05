/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api.nobelprize.org/v1/:path*',
      },
    ];
  },
  async serverMiddleware() {
    // Proxy /api requests to the Nobel Prize API
    this.nuxt.hook('render:setupMiddleware', (app) => {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'http://api.nobelprize.org/v1',
          changeOrigin: true,
          pathRewrite: { '^/api': '/' },
        })
      );
    });
  },
};