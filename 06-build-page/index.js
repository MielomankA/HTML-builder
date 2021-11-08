const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const projectDist = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const indexHTMLPath = path.join(projectDist, 'index.html');
const folderStyles = path.join(__dirname, 'styles');
const assetsSrc = path.join(__dirname, 'assets');
const assetsTerm = path.join(projectDist, 'assets');

const createDir = async (pathDir) => {
  return new Promise((resolve) => {
    fs.mkdir(pathDir, { recursive: true }, (err) => {
      if (err) return console.log(err);

      resolve();
    });
  });
};

const getHTML = async (dirPath) => {
  return new Promise((resolve) => {
    fs.readFile(dirPath, 'utf-8', (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
};

const getComponents = async (dirPath) => {
  return new Promise((resolve) => {
    fs.readFile(dirPath, 'utf-8', (err, data) => {
      if (err) throw err;

      resolve({
        [path.parse(dirPath).name]: data,
      });
    });
  });
};

const getFileNames = async (dirPath) => {
  return new Promise((resolve) => {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      const res = files.filter((file) => {
        return !file.isDirectory() && path.extname(file.name) === '.html';
      });
      resolve(res);
    });
  });
};

const createFile = async (dirPath, data) => {
  return new Promise((resolve) => {
    fs.writeFile(dirPath, data, (err) => {
      if (err) throw err;
    });
    resolve();
  });
};

const bundleStyles = path.join(projectDist, 'style.css');

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
              fs.promises.appendFile(path.join(projectDist, 'style.css'), data);
            });
          }
        });
      }
    );
    resolve();
  });
};

(async () => {
  await createDir(projectDist);

  const templHtml = await getHTML(templatePath);
  const compList = await getFileNames(componentsPath);
  const dataComponents = await Promise.all(
    compList.map((fileName) => {
      return getComponents(path.join(componentsPath, fileName.name));
    })
  ).then((result) => {
    return Object.assign({}, ...result);
  });
  const templateData = Object.keys(dataComponents).reduce((res, key) => {
    return res.replace(`{{${key}}}`, dataComponents[key]);
  }, templHtml);
  await createFile(indexHTMLPath, templateData);

  const stylesData = await getStylesFile(folderStyles);
  console.log('style', stylesData);
  await createFile(bundleStyles, stylesData);

  //copy assets
})();
