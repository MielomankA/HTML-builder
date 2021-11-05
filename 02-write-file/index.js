const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(file);

process.stdout.write('\n*** Please enter your information:\n');

process.stdin.on('data', (chunk) => {
  writeStream.write(chunk.toString('utf-8'));

  if (chunk.toString('utf-8').trim() === 'exit') {
    process.stdout.write('\n*** Good buy! \n');
    process.exit();
  }
});

process.on('SIGINT', () => {
  process.stdout.write('\n*** Good buy! \n');
  process.exit();
});
