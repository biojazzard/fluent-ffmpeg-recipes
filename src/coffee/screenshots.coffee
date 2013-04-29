  ###
 * @namespace ffmpeg | recipes
 *
 * @author Alfredo Llanos <alfredo@tallerdelsoho.es> || @biojazzard
###

ffmpeg = require 'fluent-ffmpeg'
video =
  source: "videos/video2.mp4"

screenshot =
  number: 5
  size: "150x100"
  folder: "screenshots"

app =
  msg:
    success: "Screenshots Created!!!"

process = new ffmpeg(video)
  .withSize(screenshot.size)
  .takeScreenshots screenshot.number, screenshot.folder, (err, filenames) ->
    console.log filenames
    console.log app.msg.success