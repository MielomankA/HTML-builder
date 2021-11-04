const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(file, 'utf-8');

stream.on('readable', function () {
  const data = stream.read();

  if (data) console.log(data);
});

stream.on('end', function () {
  console.log('THE END');
});
