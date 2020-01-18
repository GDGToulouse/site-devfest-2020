const path = require('path');
const {sync: glob} = require('glob');
const sharp = require('sharp');
const {Logger, LogLevel, colorEmojiConfig} = require('plop-logger');

Logger.config = colorEmojiConfig;
const logger = Logger.getLogger('images');
logger.level = LogLevel.All;

const imagesFiles = [
  {files: `static/images/team/*.*`, width: 150, format: 'webp'},
  {files: `static/images/partners/**/*.*`, height: 180, format: 'webp'},
  {files: `static/images/album/**/*.*`, format: 'webp'},
  {files: `static/images/wtf/*.*`, format: 'webp'},
  {files: `static/images/backgrounds/**/*.*`, format: 'webp'},
  {files: `static/images/*.jpg`, format: 'webp'}
];

const failure = msg => err => {
  logger.error(msg);
  console.error(err);
};

const computeOptions = ({file, width, height, format}) => {
  if (width && height)
    return {msg: `resize ${file} to ${width}x${height}`, resizeOpt: {width, height}};
  else if (width)
    return {msg: `resize ${file} to width ${width}`, resizeOpt: {width}};
  else if (height)
    return {msg: `resize ${file} to height ${height}`, resizeOpt: {height}};
  else
    return {msg: `convert ${file} to format ${format}`};
};

imagesFiles.forEach(({files, width, height, format}) => {
  logger.info(`Deal with ${files}: format: ${format}, width: ${width}, height: ${height}`);
  glob(files)
    .forEach(file => {
      const {dir, name, ext} = path.parse(file);
      if (ext.endsWith(format)) {
        logger.debug(`Skip ${file}, already at format ${format}`);
      } else {
        const output = path.format({dir, name, ext: '.' + format});
        const {msg, resizeOpt} = computeOptions({file, width, height, format});

        const src = resizeOpt ? sharp(file).resize(resizeOpt) : sharp(file);
        src.toFile(output)
          .catch(failure(`Fail to ${msg}`))
          .then(() => logger.info(msg, '[OK]'));
      }

    });
});

