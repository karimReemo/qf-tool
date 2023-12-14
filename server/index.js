const express = require('express');
const bodyParser = require('body-parser');
const { spawnSync } = require('child_process');

const { readFile } = require('fs/promises');
const { appendFile } = require('fs/promises');
const { join } = require('path');
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from QF BE' });
});

app.get('/run', (req, res) => {
  try{

    const command = 'python3';
    const args = [
      '~/SharqScan/SharqScan.py',
      '10',
      'fantasy.premierleague.com',
    ];
    
    const options = {
      encoding: 'utf-8',
      stdio: 'inherit', // Use 'inherit' to print output to the console
    };
    
    const pythonProcess = spawnSync(command, args, options);
    
    // Check the exit code to determine if the command was successful
    if (pythonProcess.status === 0) {
      res.status(200).json({ message: `Command executed successfully` });

      console.log('Sucesss');
    } else {
      console.error('Command failed');
      res.status(500).json({ message: `Error: ${pythonProcess.stderr}` });

      console.error('Error:',pythonProcess.stderr );
    }
    
    // Access the command output
    console.log('Command output:', pythonProcess.stdout);
    
  }
  catch(err){
    res.status(500).json({ message: `Catched error: ${err}` });

  }
 
});






app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});


