const withImages = require('next-images');
const config = withImages();

config.redirects = async () => {
  return [
    {
      source: '/',
      destination: '/produkty',
      permanent: false,
    },
  ];
};

config.reactStrictMode = true;
config.poweredByHeader = false;

module.exports = config;
