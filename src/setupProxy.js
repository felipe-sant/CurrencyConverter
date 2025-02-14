const { createProxyMiddleware } = require(' ');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://v6.exchangerate-api.com/v6',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};