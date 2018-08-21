// add default and flow babel presets
const presets = ['@babel/env', '@babel/flow'];

// ignore test files
const ignore = ['src/__tests__'];

// export the config file
module.exports = function(api) {
  // if NODE_ENV=production, add minify preset
  const isProduction = api.cache(() => process.env.NODE_ENV === 'production');
  const isDevelopment = api.cache(() => process.env.NODE_ENV === 'development');

  if (isProduction) {
    presets.push('minify');
  } else if (isDevelopment && presets.includes('minify')) {
    const minifyIndex = presets.indexOf('minify');

    presets.splice(minifyIndex, 1);
  }

  // return config object
  return {
    presets,
    ignore,
    comments: false,
  };
};
