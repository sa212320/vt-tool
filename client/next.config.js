const path=require('path')
module.exports = {
/* config options here */
  webpack(config){
    Object.assign(config.resolve.alias, {
      "__dirname": path.join(__dirname),
    });
    return config;
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/watch': { page: '/watch' },
      '/privacy': { page: '/privacy' },
    }
  }
}