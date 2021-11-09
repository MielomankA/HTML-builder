const fs = require('fs');
const path = require('path');

const folderStyles = path.join(__dirname, 'styles');
const projectDist = path.join(__dirname, 'project-dist');

const getStylesFile = async (pathDir) => {
  return new Promise((resolve) => {
    fs.readdir(
      pathDir,
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
          if (path.extname(file.name) === '.css' && !file.isDirectory()) {
            const streamRead = fs.createReadStream(
              path.join(pathDir, file.name),
              'utf8'
            );
            streamRead.on('data', (data) => {
              // if (file === 'style.css') {
              //   console.log('111', data);
              // }
              fs.promises.appendFile(
                path.join(projectDist, 'bundle.css'),
                data
              );
            });
          }
        });
      }
    );
    resolve();
  });
};

(async () => {
  await getStylesFile(folderStyles);
})();
