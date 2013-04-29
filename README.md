fluent-ffmpeg-recipes
=====================

node´s fluent-ffmpeg recipes bootstraping

## What you need

### Homebrew [for OSX users]

<pre>
  ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
</pre>

### ffmpeg [for OSX users]

<pre>
  brew install ffmpeg
</pre>

### node [for OSX users]

<pre>
  brew install node
</pre>

## Install

* cd to the project folder & run :

<pre>
  npm install
</pre>

## Run It!

* cd to the project folder (if you are not still there) & run :

<pre>
  grunt
</pre>

## And now?

* Drag a video to '_videos' folder.
* Wait or check your Terminal logs.
* Check '_processed' folder to see your converted videos.

## What more?

* Edit src/coffee/process.coffee
* Edit config or operations vaules.

## What´s going on?

* grunt will be watching both '_videos' and 'src/coffee/*.coffee'
* Editing / Saving 'src/coffee/process.coffee' will compile to 'process.js' and will be executed.
* Files contained in '_videos' will be reencoded with the new settings.
* Again adding new videos will reencode the all.
* If you don´t want the to be reencoded, please remove them from '_videos'.


