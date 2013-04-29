/*
 * @namespace ffmpeg | recipes
 *
 * @author Alfredo Llanos <alfredo@tallerdelsoho.es> || @biojazzard
*/


(function() {
  var app, audio, config, ffmpeg, fs, operations, processFile, processIt, render, screenshot, video, videoFiles, _, _log;

  ffmpeg = require('fluent-ffmpeg');

  fs = require('fs');

  _ = require('underscore');

  config = {
    src: '_videos',
    render: '_processed'
  };

  operations = {
    preset: 'podcast',
    dimensions: '640x?',
    aspect: '4:3',
    fps: 24,
    bitrate: 1024,
    codec: 'libx264',
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


  videoFiles = fs.readdir(config.src, function(err, files) {
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
      source: config.src + '/' + file
    };
    render = {
      file: config.render + '/' + file
    };
    return process = new ffmpeg(video).usingPreset('divx').saveToFile(render.file, function(stdout, stderr) {
      return _log(file + app.msg.success);
    });
  };

  _log = function(msg) {
    return console.log(msg);
  };

}).call(this);
