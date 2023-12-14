const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

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
    exec('python3 ~/SharqScan/SharqScan.py 31 fantasy.premierleague.com', (error, stdout, stderr) => {
      if (error) {
        console.log('error')
        res.status(500).json({ message: `Error executing command: ${error.message}` });
        return;
      }
  
      res.status(200).json({ message: `stdout: ${stdout}/ stderr: ${stderr}` });
    });
  }
  catch(err){
    res.status(500).json({ message: `Catched error: ${err}` });

  }
 
});

app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});