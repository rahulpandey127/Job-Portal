import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./config/instrument.js";
import cors from "cors";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import db from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();

//Routes

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);
app.get("/webhooks", clerkWebhooks);

Sentry.setupExpressErrorHandler(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
