/*
 * @namespace ffmpeg | recipes
 *
 * @author Alfredo Llanos <alfredo@tallerdelsoho.es> || @biojazzard
*/


(function() {
  var app, audio, ffmpeg, process, screenshot, video;

  ffmpeg = require('fluent-ffmpeg');

  video = {
    source: 'videos/video1.mp4',
    render: 'renders/video1.mp4',
    size: '640x?',
    aspect: '16:9',
    fps: 24,
    bitrate: 1024,
    codec: 'x264',
    format: 'mp4'
  };

  audio = {
    bitrate: '128k',
    codec: 'libmp3lame',
    channels: 2
  };

  screenshot = {
    number: 5,
    size: '150x100',
    folder: 'screenshots'
  };

  app = {
    msg: {
      success: 'Screenshots Created!!!'
    }
  };

  process = new ffmpeg(video).withSize(video.size).withAspect(video.aspect).withFps(video.fps).toFormat(video.format).saveToFile(video.render, function(stdout, stderr) {
    return console.log("converted succesfully | archivo convertido");
  });

}).call(this);

/*
 * @namespace ffmpeg | recipes
 *
 * @author Alfredo Llanos <alfredo@tallerdelsoho.es> || @biojazzard
*/


(function() {
  var app, audio, config, ffmpeg, fs, processFile, processIt, render, screenshot, video, videoFiles, _, _log;

  ffmpeg = require('fluent-ffmpeg');

  fs = require('fs');

  _ = require('underscore');

  config = {
    source: '_videos',
    renderFolder: '_processed',
    size: '640x?',
    fps: 24,
    bitrate: 1024,
    codec: 'x264',
    format: 'mp4'
  };

  audio = {
    bitrate: '128k',
    codec: 'libmp3lame',
    channels: 2
  };

  screenshot = {
    number: 5,
    size: '150x100',
    folder: 'screenshots'
  };

  app = {
    msg: {
      success: ' | === > | File Created | OK'
    }
  };

  video = [];

  render = [];

  /*
   # Read Folder Items
  */


  videoFiles = fs.readdir(config.source, function(err, files) {
    if (err) {
      throw err;
    }
    _.each(files, processFile);
    return _.each(files, processIt);
  });

  processFile = function(elem, ind, list) {
    if (elem === '.DS_Store') {
      return list.splice(ind, 1);
    }
  };

  processIt = function(file) {
    var process;

    video = {
      source: config.source + '/' + file
    };
    render = {
      file: config.renderFolder + '/' + file
    };
    return process = new ffmpeg(video).onCodecData(function(codecinfo) {
      return console.log(codecinfo);
    }).withSize(config.size).withAspect(config.aspect).withFps(config.fps).toFormat(config.format).saveToFile(render.file, function(stdout, stderr) {
      return console.log(render.file + app.msg.success);
    });
  };

  _log = function(msg) {
    return console.log(msg);
  };

}).call(this);

/*
 * @namespace ffmpeg | recipes
 *
 * @author Alfredo Llanos <alfredo@tallerdelsoho.es> || @biojazzard
*/


(function() {


}).call(this);
