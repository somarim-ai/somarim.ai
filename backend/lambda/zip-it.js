
const fs = require('fs');
const archiver = require('archiver');

const directoryToZip = process.argv[2];
const zipFilePath = process.argv[3];

if (!directoryToZip || !zipFilePath) {
    console.error('Usage: node zip-it.js <directory-to-zip> <zip-file-path>');
    process.exit(1);
}

const output = fs.createWriteStream(zipFilePath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);
archive.directory(directoryToZip, false);
archive.finalize();
