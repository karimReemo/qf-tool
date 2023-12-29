const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4, validate: validateUuid } = require("uuid");
const { exec } = require("child_process");
const pgp = require("pg-promise")();
var cors = require('cors');

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
app.use(cors({origin: 'http://localhost:5173'}));

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

app.get("/results/sslyze/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const record = await db.oneOrNone(
      "SELECT * FROM sslyze WHERE uuid = $1",
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

app.get("/results/wapiti/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const record = await db.oneOrNone(
      "SELECT * FROM wapiti WHERE uuid = $1",
      uuid
    );
    if (record) {
      const result = parseInfoLevel({record});

      res.status(200).json({ result });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching record: ${error.message}` });
  }
});

function parseInfoLevel(data) {
  try {
    // Parse the data if it's a string
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    // Check if "record" exists and has the expected structure
    if (parsedData && parsedData.record && parsedData.record.vulns) {
      // Extract "info" and "level" from each vulnerability
      const extractedInfoLevel = parsedData.record.vulns.reduce((acc, vuln) => {
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
      throw new Error('Invalid data structure');
    }
  } catch (error) {
    console.error('Error parsing data:', error.message);
    return null;
  }
}

function parseInfoLevel(data) {
  try {
    // Parse the data if it's a string
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    // Check if "record" exists and has the expected structure
    if (parsedData && parsedData.record && parsedData.record.vulns) {
      // Extract "info" and "level" from each vulnerability
      const extractedInfoLevel = parsedData.record.vulns.reduce((acc, vuln) => {
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
      throw new Error('Invalid data structure');
    }
  } catch (error) {
    console.error('Error parsing data:', error.message);
    return null;
  }
}



// Example usage:
const jsonData = '{"record":{"uuid":641,"vulns":[[],[],[{"method":"GET","path":"/","info":"CSP \"script-src\" value is not safe","level":1,"parameter":"","http_request":"GET / HTTP/1.1\nHost: sharqsec.com","curl_command":"curl \"https://sharqsec.com/\""},{"method":"GET","path":"/","info":"CSP \"object-src\" value is not safe","level":1,"parameter":"","http_request":"GET / HTTP/1.1\nHost: sharqsec.com","curl_command":"curl \"https://sharqsec.com/\""}],[],[],[],[],[],[{"method":"GET","path":"/","info":"X-XSS-Protection is not set","level":1,"parameter":"","http_request":"GET / HTTP/1.1\nHost: sharqsec.com","curl_command":"curl \"https://sharqsec.com/\""}]]}}';
const result = parseInfoLevel(jsonData);
console.log(result);


app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});
