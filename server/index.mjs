import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "express-async-errors";
import "./loadEnvs.mjs";
import users from "./routes/users.mjs";

const PORT = process.env.PORT || 3000;
const connectionString = process.env.ATLAS_URI || "";

const app = express();

app.use(cors());
app.use(express.json());

// async function connect() {
//   try {
//     await mongoose.connect(connectionString);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error(error);
//   }
// }

// connect();


// // Load the /posts routes
app.use("/users", users);

// Global error handling
app.use((err, _req, res, next) => {
  console.log("error", err);
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
