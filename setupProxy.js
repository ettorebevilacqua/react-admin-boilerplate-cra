const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'http://vps-fe612251.vps.ovh.net:3010/v1',
      changeOrigin: true,
    }),
  );
};
