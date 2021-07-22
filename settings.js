'use strict';

const dirs = {
  src: './src/',
  dest: './build/'
};

module.exports = {
  paths: {
    src: {
      root: dirs.src,
      pages: dirs.src + 'html/',
      styles: dirs.src + 'sass/',
      scripts: dirs.src + 'js/',
      images: {
        all: dirs.src + 'img/',
        sprite: dirs.src + 'img/sprite/',
        spriteSvg: dirs.src + 'img/sprite/svg/'
      },
      fonts: dirs.src + 'fonts/'
    },
    dest: {
      root: dirs.dest,
      styles: dirs.dest + 'css/',
      scripts: dirs.dest + 'js/',
      images: {
        all: dirs.dest + 'img/',
        sprite: dirs.src + 'img/sprite/',
        spriteSvg: dirs.src + 'img/sprite/svg/'
      },
      fonts: dirs.dest + 'fonts/'
    }
  }
};
