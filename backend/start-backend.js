const { exec } = require('child_process');

const command = `set FLASK_APP=App\\endPoints.py&& set FLASK_ENV=development&& flask run`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});