const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const isProd = process.env.STAGE === 'production';

const nextConfig = {
  assetPrefix: isProd ? 'https://s3-us-west-2.amazonaws.com/austincc.xyz.sls' : '',
  target: 'serverless',
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
        optimizeImagesInDev: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [180, 360, 600, 760, 1000],
        },
      },
    ],
  ],
  nextConfig
);
