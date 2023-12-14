const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const { exec } = require('child_process');
const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', response.status(200).json({message:"Hello from QF BE"}))
app.get('/run', exec('python3 ~/SharqScan/SharqScan.py 8 fantasy.premierleague.com', (error, stdout, stderr) => {
  if (error) {

    return response.status(200).json({message:`Error executing command: ${error.message}`})
  }

  return response.status(200).json({message:`stdout: ${stdout}/ stderr: ${stderr}`})


}))

  
  app.listen(port, () => {
    console.log(`Hello world! App running on port ${port}.`)
  })