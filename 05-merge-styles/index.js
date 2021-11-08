const fs = require('fs');
const path = require('path');

const folderStyles = path.join(__dirname, 'styles');
const folderDist = path.join(__dirname, 'project-dist');
const bundle = path.join(__dirname, 'bundle.css');

fs.promises.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '');

fs.readdir(
  folderStyles,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      if (path.extname(file.name) === '.css' && !file.isDirectory()) {
        // console.log('111', file.name);
        const streamRead = fs.createReadStream(
          path.join(folderStyles, file.name),
          'utf8'
        );
        streamRead.on('data', (data) => {
          if (file === 'bundle.css') {
            console.log('111', bundle);
          }
          fs.promises.appendFile(path.join(folderDist, 'bundle.css'), data);
        });
      }
    });
  }
);
