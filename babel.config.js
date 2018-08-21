// add default and flow babel presets
const presets = ['@babel/env', '@babel/flow'];

// ignore test files
const ignore = ['src/__tests__'];

// export the config file
module.exports = function(api) {
  // if NODE_ENV=production, add minify preset
  if (api.env() === 'production') {
    presets.push('minify');
  }

  // return config object
  return {
    presets,
    ignore,
  };
};
