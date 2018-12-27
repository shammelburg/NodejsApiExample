const path = require('path');
const archiver = require('archiver');
const request = require('request');

exports.zip = (res, files, fileName) => {
    var archive = archiver('zip');

    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename=${fileName}`);

    archive.pipe(res);

    files.forEach(url => {
        archive
            .append(request.get(url), {
                name: path.basename(url)
            });
    });

    archive.finalize(function (err, bytes) {
        if (err)
            throw err;

        // console.log('done: ', bytes);
    });
};