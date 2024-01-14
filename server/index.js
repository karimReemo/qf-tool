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
app.use(cors());

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
    website: extractWebsiteFromResult(wapitiResults),
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
      // Extract "info" and "level" from each vulnerability, and add their category.
      const extractedInfoLevel = parsedData.vulns.reduce((acc, vuln) => {
        if (Array.isArray(vuln)) {
          vuln.forEach(({ info, level }) => {
            if (info !== undefined && level !== undefined) {
              //The first word of the info is used as the category
              const category = info.split(" ")[0];
              acc.push({ info, level, category });
            }
          });
        }
        return acc;
      }, []);
      const combinedCategories = combineCategories(extractedInfoLevel);
      return combinedCategories;
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

/**Function that searches through the details and combine the vuln that have the same category */
function combineCategories(detailsArray) {
  let combinedCategories = [];
  for (let i = 0; i < detailsArray.length; i++) {
    const category = detailsArray[i].category;
    const info = detailsArray[i].info;
    const level = detailsArray[i].level;
    const parentCategory = getParentCategory(category);


    const combinedCategoryVuln = combinedCategories.find(
      (vulnDetail) => vulnDetail.category == category
    );

    if (combinedCategoryVuln) combinedCategoryVuln.info.push(info);
    else
      combinedCategories.push({
        info: [info],
        category,
        parentCategory,
        level,
      });
  }
  return reorderDetails(combinedCategories);
}

function getParentCategory(category) {
  switch (category) {
    case "CSP":
      return "Security";
    case "X-XSS-Protection":
      return "Cookies";
    default:
      return "Other";
  }
}

function extractWebsiteFromResult(data) {
  for (const resultArray of data.vulns) {
    if (!resultArray.length) {
      continue; // Skip arrays and non-object items
    }
    let website;
    resultArray.forEach((result) => {
      if (result.hasOwnProperty("curl_command")) {
        // Extract the website from the "http_request" field
        const httpRequestParts = result.curl_command.split(" ");
        website = httpRequestParts[1].replace(/"/g, "");
      }
    });

    if (website) {
      return website; // Return the first extracted website
    }
  }

  return null; // Return null if no website is found
}


function reorderDetails(details) {
  return details.sort((a, b) => {
    if (a.parentCategory === 'Other' && b.parentCategory !== 'Other') {
      return 1; // Move items with parentCategory 'Other' to the end
    } else if (a.parentCategory !== 'Other' && b.parentCategory === 'Other') {
      return -1; // Keep other items in their original order
    } else {
      return 0; // No change in order for items with the same parentCategory
    }
  });
}

app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});
