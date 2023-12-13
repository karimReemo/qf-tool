const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', db.getMockData)
  
  app.listen(port, () => {
    console.log(`Hello world! App running on port ${port}.`)
  })