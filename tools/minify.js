const {readFileSync, writeFileSync} = require('fs');
const {sync: glob} = require('glob');
const {minify} = require('html-minifier');
const UglifyJS = require("uglify-js");
const {Logger, LogLevel, colorEmojiConfig} = require('plop-logger');

Logger.config = colorEmojiConfig;
const logger = Logger.getLogger('minifier');
logger.level = LogLevel.All;

const htmlFiles = `public/**/*.html`;
logger.info('Compress HTML files', htmlFiles);

const totalGain = glob(htmlFiles)
  .map(file => {
    const html = readFileSync(file, 'utf8');
    const minified = minify(html, {});
    const gain = html.length - minified.length;
    if (gain > 0) {
      const percent = (gain / html.length) * 100;
      logger.debug(file, () => ['gain', percent.toFixed(2), '%'].join(" "));
      writeFileSync(file, minified, {flag: 'w'});
    }
    return gain;
  }).reduce((acc, elt) => acc + elt, 0);

logger.info('Total HTML gain', '' + totalGain);

const jsFiles = `public/sw.js`;
logger.info('Compress JS files', jsFiles);

const totaJslGain = glob(jsFiles)
  .map(file => {
    const code = readFileSync(file, 'utf8');
    const minified = UglifyJS.minify(code).code;
    const gain = code.length - minified.length;
    if (gain > 0) {
      const percent = (gain / code.length) * 100;
      logger.debug(file, () => ['gain', percent.toFixed(2), '%'].join(" "));
      writeFileSync(file, minified, {flag: 'w'});
    }
    return gain;
  }).reduce((acc, elt) => acc + elt, 0);

logger.info('Total JS gain', '' + totaJslGain);
