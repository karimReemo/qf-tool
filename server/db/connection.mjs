import { MongoClient } from "mongodb";
import "express-async-errors";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
let db;

async function main() {
  try {
    conn = await client.connect();
    db = conn.db("testingDB");

    //   await conn.close();
  } catch (error) {
    console.error("Error:", error);
  }
}
main();

export default db;
