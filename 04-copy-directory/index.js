const fs = require('fs');
const path = require('path');

const copyFolderInitial = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(
  copyFolder,
  {
    recursive: true,
  },
  (err) => {
    if (err) return console.log(err);
  }
);

fs.readdir(copyFolder, (err, files) => {
  if (err) return console.log(err);

  files.forEach((file) => {
    console.log(file);
    console.log(`${copyFolder}\\${file.name}`);

    fs.unlink(`${copyFolder}\\${file}`, (err) => {
      if (err) return console.log(err);
    });
  });
});

fs.readdir(copyFolderInitial, (err, files) => {
  if (err) return console.log(err);

  files.forEach((file) => {
    fs.copyFile(
      path.join(copyFolderInitial, file),
      path.join(copyFolder, file),
      (err) => {
        if (err) return console.log(err);
      }
    );
  });
});
