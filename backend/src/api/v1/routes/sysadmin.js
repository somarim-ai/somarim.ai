const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', async (req, res, next) => {
  const { command } = req.body;

  if (command !== 'ls -la') {
    return res.status(403).json({ error: 'For security reasons, only `ls -la` is currently allowed.' });
  }

  console.log(`Executing SysAdmin command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to execute command.', details: error.message });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Command execution resulted in an error.', details: stderr });
    }
    console.log(`stdout: ${stdout}`);
    res.json({ status: 'SYSADMIN_COMMAND_EXECUTED', command: command, output: stdout });
  });
});

module.exports = router;
