const api = {
  dev: {
    protocol: 'http://',
    host: 'localhost',
    port: 8100,
    endpoint_prefix: '',
  },
  production: {
    protocol: 'http://',
    host: 'nyc.bhelmer.com',
    port: '80',
    endpoint_prefix: '/api'
  },
};

module.exports = api;