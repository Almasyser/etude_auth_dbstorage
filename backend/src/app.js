const fs = require("node:fs");
const path = require("node:path");
const multer = require('multer');
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    optionsSuccessStatus: 200,
  })
);
const router = require("./router");
const PUBLIC_DIR = path.join(__dirname, 'public');
if(fs.existsSync(PUBLIC_DIR)){
  fs.mkdirSync(PUBLIC_DIR);
}
const storage = multer.memoryStorage;
const upload = multer({storage: storage});
app.use(router);
app.use(express.static(path.join(__dirname, "../public")));
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
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier téléchargé.');
  }
  const { originalname, mimetype, size, buffer } = req.file;
  try {
    // Connexion à MariaDB
    const connection = await mysql.createConnection(dbConfig);
    // Insertion du fichier dans la base de données
    const [result] = await connection.execute(
      'INSERT INTO files (name, mimetype, size, data) VALUES (?, ?, ?, ?)',
      [originalname, mimetype, size, buffer]
    );
    // Fermeture de la connexion
    await connection.end();
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Erreur MariaDB :', error);
    res.status(500).send('Erreur lors de la sauvegarde du fichier.');
  }
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
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}
module.exports = app;
