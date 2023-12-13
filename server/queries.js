const Pool = require("pg").Pool;

const pool = new Pool({
  user: "sharqscanPostgreSQLAdmin",
  host: "sharqscan-postgresql-server-deployment.postgres.database.azure.com",
  database: "scans",
  password: "c]QaTm736>+S{unkq9D}L[",
  port: 5432,
});

const getMockData = (request, response) => {
  pool.query("SELECT * FROM mock_data", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
    getMockData,
};
