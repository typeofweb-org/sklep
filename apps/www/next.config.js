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

module.exports = config;
