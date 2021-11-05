const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

function showFiles(folder) {
  fs.readdir(
    folder,
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) console.log(err);

      files.forEach((file) => {
        if (file.isDirectory() === false) {
          fs.stat(path.join(folder, file.name), (err, stat) => {
            const kbSize = stat.size / 2 ** 10;
            const nameFile = file.name.split('.');

            if (nameFile[0] === 0) return '';

            console.log(`${nameFile[0]} - ${nameFile[1]} - ${kbSize} kb`);
          });
        } else {
          showFiles(path.join(folder, file.name));
        }
      });
    }
  );
}

showFiles(pathFolder);
