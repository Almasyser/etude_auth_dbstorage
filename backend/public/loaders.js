const multer = require('multer');

const storage = multer.memoryStorage;
const upload = multer({storage: storage});

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

