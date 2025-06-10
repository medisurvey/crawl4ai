const { spawn } = require('child_process');

module.exports = async (req, res) => {
  const python = spawn('python', ['main.py']);
  let data = '';
  
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.status(200).send(data);
  });
};
