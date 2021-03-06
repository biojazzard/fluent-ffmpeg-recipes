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
