###
 * @namespace ffmpeg | recipes
 *
 * @author Alfredo Llanos <alfredo@tallerdelsoho.es> || @biojazzard
###

ffmpeg = require 'fluent-ffmpeg'
fs = require 'fs'
_ = require('underscore');

config =
  src: '_videos'
  render: '_processed'

operations =
  preset: 'podcast'
  dimensions: '640x?'
  # Function (chainable): withSize(size)
  # Values (string)
  #   '320x?'   - Fixed width, calculate height
  #   '?x240'   - Fixed height, calculate width
  #   '50%'     - percental resizing
  #   '320x240' - fixed size (plain ffmpeg way)
  aspect: '4:3'
  # Function (chainable): withAspect(aspect)
  # Values (string)
  #   '16:9'    - Wide
  #   '4:3'     - Normal
  fps: 24
  # Function (chainable): withFps(fps)
  # Values (number)
  #   25, 30, 48 ...
  bitrate: 1024
  # Function (chainable): withVideoBitrate(bitrate)
  # Values (string)
  #   25, 30, 48 ...
  codec: 'libx264'
  # Function (chainable): withVideoCodec(codec)
  # Values (string)
  #   'libx264', 'divx'
  format: 'mp4'
  # Function (chainable): toFormat(format)
  # Values (string)
  #   'mp4', 'divx'

audio =
  bitrate: '128k'
  codec: 'libmp3lame'
  channels: 2

screenshot =
  number: 5
  size: '150x100'
  folder: 'screenshots'

app =
  msg:
    success: ' | === > | File Created | OK'

video = []
render = []

###
 # Read Folder Items
###

videoFiles = fs.readdir config.src, (err, files) ->
  throw err if err
  _.each files, processFile
  _.each files, processIt
  #_.each files, _log

processFile = (elem, ind, list) ->
  if elem == '.DS_Store'
    list.splice ind, 1
    #fileStats = fs.Stats config.src + '/' + file, (err, stats) ->

processIt = (file) ->
  video =
    source: config.src + '/' + file
  render =
    file: config.render + '/' + file
  process = new ffmpeg(video)
    .usingPreset('divx')
    .saveToFile render.file, (stdout, stderr) ->
      _log file + app.msg.success

_log = (msg) ->
  console.log msg
