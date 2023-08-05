module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'https://berobatplus.shop',
          changeOrigin: true,
          secure: false,
          pathRewrite: { '^/api': '/api' },
        },
      },
    },
  };
  