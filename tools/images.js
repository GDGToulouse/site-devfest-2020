const path = require('path');
const {sync: glob} = require('glob');
const sharp = require('sharp');
const {Logger, LogLevel, colorEmojiConfig} = require('plop-logger');

Logger.config = colorEmojiConfig;
const logger = Logger.getLogger('images');
logger.level = LogLevel.All;

const failure = msg => err => {
  logger.error(msg);
  console.error(err);
};


// Resize and convert
const imagesFiles = [
  {files: `static/images/album/**/*.*`, format: 'webp'},
  {files: `static/images/backgrounds/*.*`, format: 'webp'},
  {files: `static/images/logos/*_text*.*`, width: 640, format: 'png'},
  {files: `static/images/partners/**/*.*`, height: 180, format: 'webp'},
  {files: `static/images/team/*.*`, width: 150, format: 'webp'},
  {files: `static/images/wtf/*.*`, format: 'webp'},
  {files: `static/images/*.jpg`, format: 'webp'}
];

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


// Create alternative image in different resolutions
const baseWidths = [1140, 960, 720, 540];
const imagesAltFiles = [
  `static/images/backgrounds/*.jpg`,
  `static/images/kids/*.jpg`,
  `static/images/wtf/*.jpg`,
  `static/images/social-share.jpg`
];

imagesAltFiles.forEach(files => {
  logger.info(`Deal with ${files} and widths: ${baseWidths}`);
  glob(files)
    .forEach(file => {
      const {dir, name} = path.parse(file);

      baseWidths.forEach(width => {
        const output = path.format({dir, name: `${name}-${width}`, ext: `.webp`});

        sharp(file).resize({width})
          .toFile(output)
          .catch(failure(`Fail to generate ${output}`))
          .then(() => logger.info(`Generate ${output}`, '[OK]'));
      });

    });
});

// Albums
glob(`static/images/album/**/*.jpg`)
  .forEach(file => {
    const {dir, name} = path.parse(file);
    baseWidths.forEach(width => {
      const output = path.format({dir, name: `${name}-${width}`, ext: `.webp`});
      sharp(file)
        .resize({width: width / 5 * 2}) // half
        .toFile(output)
        .catch(failure(`Fail to generate ${output}`))
        .then(() => logger.info(`Generate ${output}`, '[OK]'));
    });
  });

// Map
baseWidths.forEach(width => {
  const output = path.format({dir: 'static/images/', name: `map-${width}`, ext: `.webp`});
  sharp(`static/images/map.jpg`)
    .resize({width, height: 480, fit: 'cover'})
    .toFile(output)
    .catch(failure(`Fail to generate ${output}`))
    .then(() => logger.info(`Generate ${output}`, '[OK]'));
});
