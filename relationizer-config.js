var config = require('histograph-config');

var baseUrl = config.api.baseUrl;
if (baseUrl.slice(-1) !== '/') {
  baseUrl += '/';
}

var viewerConfig = {
  api: {
    baseUrl: baseUrl
  }
};

console.log(JSON.stringify(viewerConfig, null, 2));
