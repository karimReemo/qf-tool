const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4, validate: validateUuid } = require("uuid");
const { exec } = require("child_process");
const pgp = require("pg-promise")();

const app = express();
const port = 4000;

const db = pgp({
  user: "vallumScan",
  password: "c]QaTm736>+S{unkq9D}L[",
  host: "vallum-scan.postgres.database.azure.com",
  port: 5432,
  database: "vallumscan",
  ssl: true,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from QF BE" });
});

app.get("/run-test", (req, res) => {
  try {
    // Access query parameters
    const uuid = req.query.uuid;
    const website = req.query.website;

    // Validate UUID
    if (!uuid ) {
      // If the UUID is missing or invalid, return an error response
      return res.status(400).json({ error: "Missing UUID" });
    }

    if (!website) {
      // If the Website is missing or invalid, return an error response
      return res.status(400).json({ error: "Missing website" });
    }
    // Extract domain name and TLD from the URL
    const url = new URL(website);
    const domain = url.hostname;

    console.log(domain)

    exec(
      `python3 ~/SharqScan/SharqScan.py ${uuid}  ${domain}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log("error");
          res
            .status(500)
            .json({ message: `Error executing command: ${error.message}` });
          return;
        }

        res
          .status(200)
          .json({ message: `Successfully ran test for ${domain}` });
      }
    );
  } catch (err) {
    res.status(500).json({ message: `Catched error: ${err}` });
  }
});

app.get("/db/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const record = await db.oneOrNone(
      "SELECT * FROM wapiti WHERE uuid = $1",
      uuid
    );
    if (record) {
      res.status(200).json({ record });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching record: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});
