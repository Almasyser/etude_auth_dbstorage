// import some node modules for later
const fs = require("node:fs");
const path = require("node:path");
const multer = require('multer');
// create express app
const express = require("express");
const app = express();
// use some application-level middlewares
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    optionsSuccessStatus: 200,
  })
);
// import and mount the API routes
const router = require("./router");
const PUBLIC_DIR = path.join(__dirname, 'public');
if(fs.existsSync(PUBLIC_DIR)){
  fs.mkdirSync(PUBLIC_DIR);
}
const upload = multer({ dest: 'public/' });
app.use(router);
// serve the `backend/public` folder for public resources
app.use(express.static(path.join(__dirname, "../public")));
// multer
app.post('api/save-image', upload.single('image'), (req,res)=>{
  if(!req.file){
    return res.status(400).json({error: "pas de fichier"});
  }
  const filename=req.file.originalname;
  const filePath=path.join(PUBLIC_DIR, filename);
  fs.renameSync(req.file.path, filePath);
  res.json({
    success: true,
    message: "image sauvegardée",
    filePath: `/${filename}`
  });
});

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
  // serve REACT resources
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
  // redirect all requests to the REACT index file
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}
// ready to export
module.exports = app;
