
const unzipper = require('unzipper');
const fs = require('fs');

fs.createReadStream('terraform_1.8.4_linux_amd64.zip')
  .pipe(unzipper.Extract({ path: '.' }))
  .on('close', () => {
    console.log('Terraform extracted successfully!');
  })
  .on('error', (err) => {
      console.error('Error extracting Terraform:', err);
  });
