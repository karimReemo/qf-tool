const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4, validate: validateUuid } = require("uuid");
const { exec } = require("child_process");
const connectionVulnInfo = require("./sslyzeVulnInfo");
const wapitiVulnInfo = require("./wapitiVulnInfo");
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
    let website = req.query.website;

    // Validate UUID
    if (!uuid) {
      // If the UUID is missing or invalid, return an error response
      return res.status(400).json({ error: "Missing UUID" });
    }

    if (!website) {
      // If the Website is missing or invalid, return an error response
      return res.status(400).json({ error: "Missing website" });
    }

    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      // If it doesn't have a scheme, assume 'https://' and add it
      website = "https://" + website;
    }
    // Extract domain name and TLD from the URL
    const url = new URL(website);
    const domain = url.hostname;

    console.log(domain);

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

    console.log(wapitiResults);
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
  const details = parseWapitiResults(wapitiResults);

  const connectionScore = getConnectionScore(ssylyzeResults);
  const websiteSecurityScore = getWebsiteSecurityScore(details);

  addConnectionVulnToDetails(details, ssylyzeResults);

  const testDate = getTestDate(wapitiResults);

  return {
    website: extractWebsiteFromResult(wapitiResults),
    testDate:testDate,
    "connection-score": connectionScore,
    "website-score": websiteSecurityScore,
    "average-score": (connectionScore + websiteSecurityScore) / 2,
    details,
  };
}

function parseWapitiResults(data) {
  try {
    // Parse the data if it's a string
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;

    // Check if "record" exists and has the expected structure
    if (parsedData && parsedData.vulns.vulnerabilities) {
      let vulnsObject = parsedData.vulns.vulnerabilities;
      // Extract "info" and "level" from each vulnerability, and add their title.
      const extractedInfoLevel = Object.entries(vulnsObject).reduce(
        (acc, [vulnCategory, vulnInfo]) => {
          if (Array.isArray(vulnInfo)) {
            vulnInfo.forEach(({ info, level }) => {
              if (info !== undefined && level !== undefined) {
                //The first word of the info is used as the title
                const title = info.split(" ")[0];
                //Ignore HTTP Secure headers as they are laid out in the sslyze results
                if (vulnCategory !== "HTTP Secure Headers")
                  acc.push({
                    info,
                    level,
                    title,
                    category: vulnCategory,
                    categoryInfo: wapitiVulnInfo[vulnCategory],
                  });
              }
            });
          }
          return acc;
        },
        []
      );
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
  return 100 - parsedWapiti.length * 5;
}

/**Function that searches through the details and combine the vuln that have the same title */
function combineCategories(detailsArray) {
  let combinedCategories = [];
  for (let i = 0; i < detailsArray.length; i++) {
    const title = detailsArray[i].title;
    const info = detailsArray[i].info;
    const level = detailsArray[i].level;
    const category = detailsArray[i].category;
    const categoryInfo = detailsArray[i].categoryInfo;

    const combinedCategoryVuln = combinedCategories.find(
      (vulnDetail) => vulnDetail.category == category
    );

    if (combinedCategoryVuln) combinedCategoryVuln.info.push(info);
    else
      combinedCategories.push({
        info: [info],
        title,
        category,
        level,
        categoryInfo,
      });
  }
  return reorderDetails(combinedCategories);
}

function extractWebsiteFromResult(data) {
  let vulnsObject = data.vulns.vulnerabilities;
  const extractedVulns = Object.values(vulnsObject);

  for (const resultArray of extractedVulns) {
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
    if (a.category === "Other" && b.category !== "Other") {
      return 1; // Move items with category 'Other' to the end
    } else if (a.category !== "Other" && b.category === "Other") {
      return -1; // Keep other items in their original order
    } else {
      return 0; // No change in order for items with the same category
    }
  });
}

app.listen(port, () => {
  console.log(`Hello world! App running on port ${port}.`);
});

function addConnectionVulnToDetails(details, sslyzeResults) {
  const allTrueSslyze = Object.keys(sslyzeResults).filter(
    (key) => sslyzeResults[key] === true
  );
  delete allTrueSslyze.tls2;
  delete allTrueSslyze.hsts;

  allTrueSslyze
    .filter((vuln) => vuln !== "hsts" && vuln !== "tls3")
    .forEach((sslyzeVuln) => {
      details.push({
        info: [connectionVulnInfo[sslyzeVuln]],
        title: sslyzeVuln,
        category: "Connection",
        categoryInfo: "HTTP Secure Headers' vulnerabilities.",
        level: 1,
      });
    });
}

const getTestDate = (wapitiResults) => {
  const parsedData = typeof wapitiResults === "string" ? JSON.parse(wapitiResults) : wapitiResults;
  // Check if "record" exists and has the expected structure
  if (parsedData && parsedData.vulns.infos) {
    let infoObject = parsedData.vulns.infos;
    return infoObject.date.slice(0, -6);
  }
  return null;
};
