const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
// console.log('111', file);

fs.readFile(file, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
