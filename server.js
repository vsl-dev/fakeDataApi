import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routers/api.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.use("/api", apiRoutes); // Api routes

app.get("/*", (req, res) => {
  res.status(404).sendFile(__dirname + "/pages/404.html");
});

app.listen(8888, () => {
  console.log("App is running on port ---> http://localhost:8888");
});
