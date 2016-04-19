var gulp = require('gulp');
var del = require('del');
var bookmarklet = require('gulp-bookmarklet');
var netscape = require('netscape-bookmarks');
var through = require('through2');
var File = require('vinyl');
var bookmarklets_config = require('./bookmarklets.json');

gulp.task('esri_rest_diagnostics', ['bookmarklet'], function () {
    return gulp.src(["**/*.min.js", '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(esri_rest_diagnostics({"output_file": "bookmarklets.html"}))
        .pipe(gulp.dest("./"));
});

gulp.task('bookmarklet', ['clean-min'], function () {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'js'}))
        .pipe(gulp.dest('.'));
});

gulp.task('bookmarklet-html', ['clean-min'], function () {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('bookmarklet-htmlsingle', ['clean-min'], function () {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'htmlsingle', file: 'bookmarklets_raw.html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('clean-min', function () {
    return del(['**/*.min.js', 'bookmarklets.html']);
});

gulp.task('default', ['esri_rest_diagnostics']);

var esri_rest_diagnostics = function (args) {
    var opt = args || {};
    var output_file_name = opt.output_file || "bookmarklets.html";

    return through.obj(function (file, encoding, callback) {
        function generate_bookmarklets_html(file) {
            var file_delimiter = file.path.toString().indexOf("\\") > -1 ? "\\" : "/";
            var file_name = file.path.split(file_delimiter).pop();
            Object.keys(bookmarklets_config).forEach(function (section) {
                Object.keys(bookmarklets_config[section].contents).forEach(function (bookmark) {
                    var bookmark_file_name = bookmarklets_config[section].contents[bookmark];
                    if (bookmark_file_name.toLowerCase() === file_name.toLowerCase()) {
                        bookmarklets_config[section].contents[bookmark] = file.contents.toString();
                    }
                });
            });
        }
        callback(null, generate_bookmarklets_html(file));
    }, function (callback) {
        var html = netscape(bookmarklets_config);

        html = html.replace(/Bookmarks\ Menu/gi, "ESRI Rest Diagnostics");
        html = html.replace(/Bookmarks/gi, "ESRI Rest Diagnostics");
        html = html.replace(/<\/H1>/gi, "</H1><p>This page provides links to tools that can be used to inspect and pull out data out of ArcGIS REST Services.</p>");
        html = html.replace(/<DL>/gi, "<UL>");
        html = html.replace(/<\/DL>/gi, "</UL>");
        html = html.replace(/<DT>/gi, "<LI>");
        html = html.replace(/<\/DT>/gi, "</LI>");
        html = html.replace(/<H3>/gi, "");
        html = html.replace(/<\/H3>/gi, "");
        html = html.replace(/<UL><p>/gi, "<UL>");
        html = html.replace(/<\/UL><p>/gi, "</UL>");
        html += "</body></html>";

        var bookmarklet_file = new File({
            path: output_file_name,
            contents: new Buffer(html)
        });

        this.push(bookmarklet_file);
        callback(null);
    });
};
