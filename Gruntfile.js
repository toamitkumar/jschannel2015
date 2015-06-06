module.exports = function( grunt ) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'public/scripts/jquery-1.10.2.min.js',
          'public/scripts/jquery.plugin.js',
          'public/scripts/jquery.ui.map.min.js',
          'public/scripts/bootstrap.min.js',
          'public/scripts/jquery.flexslider-min.js',
          'public/scripts/jquery.carousel.js',
          'public/scripts/jquery.scrollTo-1.4.3.1-min.js',
          'public/scripts/jquery.parallax-1.1.3.js',
          'public/scripts/jquery.localscroll-1.2.7-min.js',
          'public/scripts/jquery.nav.js',
          'public/scripts/jquery.jCanvas.js',
          'public/scripts/jquery.countdown.min.js',
          'public/scripts/jquery.fancybox.pack.js',
          'public/scripts/jquery.fancybox-media.js',
          'public/scripts/custom.js'
        ],
        dest: 'release/js/production.js',
      },
    },
    uglify : {
      dist: {
        files: {
          "public/release/js/production.min.js": ["release/js/production.js"]
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['public/stylesheets/*.min.css'],
            dest: 'release/css/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/stylesheets',
          src: ['*.css', '!*.min.css'],
          dest: 'release/css/',
          ext: '.min.css'
        }]
      }
    },
    concat_css: {
      all: {
        src: [
          'release/css/bootstrap.min.css',
          'release/css/bootstrap-responsive.min.css',
          'release/css/style.min.css',
          'release/css/fonts.min.css',
          'release/css/fontello.min.css',
          'release/css/jquery-countdown.min.css',
          'release/css/flexslider.min.css',
          'release/css/jquery-fancybox.min.css'
        ],
        dest: "public/release/css/production.min.css"
      },
    },
    clean: ["release"],
    watch: {
      scripts: {
        files: ['public/**'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.registerTask("default", ['concat', 'uglify', 'copy', 'cssmin', 'concat_css', 'clean']);
};