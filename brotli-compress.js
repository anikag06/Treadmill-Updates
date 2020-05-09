const brotliCompress = require('brotli');
const fs = require('fs');

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 10, // 0 - 11,
  lgwin: 12, // default
};
// Change 'dist/treadwill-v2-fe/' to '../public' for production use.
fs.readdirSync('dist/treadwill-v2-fe/').forEach((file) => {
  if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
    const result = brotliCompress.compress(
      fs.readFileSync('dist/treadwill-v2-fe/' + file),
      brotliSettings,
    );
    fs.writeFileSync('dist/treadwill-v2-fe/' + file + '.br', result);
  }
});
