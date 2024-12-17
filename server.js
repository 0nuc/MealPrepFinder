const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'MealPrepFinder'
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion : ' + err.stack);
        return;
    }
    console.log('Connecté en tant que ' + connection.threadId);
});

// Route pour récupérer les recettes
app.get('/api/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
        }
        res.json(results);
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// Fermer la connexion à la base de données lors de l'arrêt du serveur
process.on('exit', () => {
    connection.end();
});