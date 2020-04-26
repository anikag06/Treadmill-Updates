// This file is added to reduce the momment.js size in production by using only en locale.
'use strict';

const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)],
};
