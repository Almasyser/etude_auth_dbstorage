const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173"], //"http://localhost:3000", "http://localhost:3001",
    optionsSuccessStatus: 200,
  })
);
const router = require("./router");
const PUBLIC_DIR = path.join(__dirname, 'public');
if(fs.existsSync(PUBLIC_DIR)){
  fs.mkdirSync(PUBLIC_DIR);
}

app.use(router);
app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);
if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}
module.exports = app;
