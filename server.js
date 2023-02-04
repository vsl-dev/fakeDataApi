import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import ejs from "ejs";
import bodyParser from "body-parser";
import apiRoutes from "./routers/api.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/pages"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("json spaces", 1);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api", apiRoutes); // Api routes

app.get("/*", (req, res) => {
  res.status(404).render("404");
});

app.listen(8888, () => {
  console.log("App is running on http://localhost:8888 --- https://vsldev.tk");
});
