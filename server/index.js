const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4, validate: validateUuid } = require("uuid");
const { exec } = require("child_process");
const pgp = require("pg-promise")();
var cors = require("cors");

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
app.use(cors({ origin: "http://localhost:5173" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from QF BE" });
});

app.post("/run-test", (req, res) => {
  try {
    // Access query parameters
    const uuid = req.query.uuid;
    const website = req.query.website;

    // Validate UUID
    if (!uuid) {
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

app.get("/results/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const ssylyzeResults = await db.oneOrNone(
      "SELECT * FROM sslyze WHERE uuid = $1",
      uuid
    );
    const wapitiResults = await db.oneOrNone(
      "SELECT * FROM wapiti WHERE uuid = $1",
      uuid
    );
    if (ssylyzeResults && wapitiResults) {
      const parsedResults = parseResults(ssylyzeResults, wapitiResults);
      res.status(200).json(parsedResults);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching record: ${error.message}` });
  }
});


function parseResults(ssylyzeResults, wapitiResults) {
  const parsedWapiti = parseWapitiResults(wapitiResults);
  
  const connectionScore = getConnectionScore(ssylyzeResults);

  const websiteSecurityScore = getWebsiteSecurityScore(parsedWapiti);

  return {
    "connection-score": connectionScore,
    "website-score": websiteSecurityScore,
    "average-score": (connectionScore + websiteSecurityScore) / 2,
    details: parsedWapiti,
  };
}

function parseWapitiResults(data) {

  try {
    // Parse the data if it's a string
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
    // Check if "record" exists and has the expected structure
    if (parsedData && parsedData && parsedData.vulns) {
      // Extract "info" and "level" from each vulnerability
      const extractedInfoLevel = parsedData.vulns.reduce((acc, vuln) => {
        if (Array.isArray(vuln)) {
          vuln.forEach(({ info, level }) => {
            if (info !== undefined && level !== undefined) {
              acc.push({ info, level });
            }
          });
        }
        return acc;
      }, []);

      return extractedInfoLevel;
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error("Error parsing data:", error.message);
    return null;
  }
}

function getConnectionScore(ssylyzeResults) {
  if (ssylyzeResults.tls2 === false) {
    if (ssylyzeResults.tls3 && ssylyzeResults.hsts) return 100;
    if (ssylyzeResults.tls3 && !ssylyzeResults.hsts) return 80;
  } else {
    if (ssylyzeResults.hsts) return 70;
    if (!ssylyzeResults.hsts) return 50;
  }
}

function getWebsiteSecurityScore(parsedWapiti) {
  if (parsedWapiti.length > 9) return 0;
  return 100 - parsedWapiti.length * 10;
}

app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});
