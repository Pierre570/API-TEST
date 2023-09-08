const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path'); // Importez le module path
const cors = require('cors'); // Importez le module CORS

// Configuration de Multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Utilisez CORS comme middleware
// app.use(cors());

app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }
    const publicLink = `https://api-test-ashen.vercel.app/uploads/${req.file.filename}`;
    console.log(publicLink)
    res.json({ message: 'Image téléchargée avec succès', link: publicLink });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send("MY API")
})

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
