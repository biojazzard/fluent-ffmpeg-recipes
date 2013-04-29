module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    prj: grunt.file.readJSON "project.json"

    meta:
      file: '<%= pkg.name %>'
      banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
              '   <%= pkg.homepage %>\n' +
              '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
              ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */\n'

    coffee:
      compile:
        files:
          #"js/<%= meta.file %>.js": ["src/coffee/*.coffee", "src/coffee/lib/*.coffee"] # compile and concat into single file
          "<%= prj.dist.folder %><%= prj.dist.js %><%= prj.dist.index %>.debug.js": "src/coffee/*.coffee" # compile and concat into single file

      split:
        expand: true,
        flatten: true,
        cwd: '',
        src: ['src/coffee/*.coffee'],
        dest: '',
        ext: '.js'

    uglify:
      options: compress: false, banner: "<%= meta.banner %>"
      app: files: '<%= prj.dist.folder %><%= prj.dist.js %><%= prj.dist.index %>.js': '<%= prj.dist.folder %><%= prj.dist.js %><%= prj.dist.index %>.debug.js'

    watch:
      app:
        files: ['src/coffee/*.coffee', '_videos/*.*']
        tasks: ['coffee:split', 'shell:node']
      
      #videos:
      #  files: ['_videos/*.*']
      #  tasks: ['shell:node']

    shell:
      node:
        command: 'node process.js'
        options:
          stdout: true

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'

  # Default task.
  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'js', ['coffee', 'uglify']
  grunt.registerTask 'split', ['coffee:split']
  #grunt.registerTask 'videos', ['watch:videos', 'watch:app']

