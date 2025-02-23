const express = require('express');
const app = express();
const cors = require('cors');
const { getAllQuery, insertData, updateData } = require('../lib/db');
require('dotenv').config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/api', (req, res) => {
    res.send('Hello from API');
});

// Fetching all articles from the database
app.get('/api/articles', async (req, res) => {    
    const { page } = req.query;

    if (!page) {
        res.status(400).send('Bad Request');
        return;
    }

    console.log("Received GET request from client.");

    try {
        const articles = await getAllQuery(`SELECT * FROM Article LIMIT 10 OFFSET ${(parseInt(page) - 1) * 10}`);
        res.json(articles);
    } catch (err) {
        console.error("Error loading articles. ", err);
        res.status(500).send('Internal Server Error');
    }
});

// Inserting a new article into the database
app.post('/api/articles', async (req, res) => {
    const { data } = req.body;

    if (!data) {
        res.status(400).send('Bad Request');
        console.log(req.body);
        return;
    }
    
    console.log("Received POST request from client: ", data);

    try {
        const { title, date, summary, publisher } = data;
        await insertData([[title, summary, publisher, date]]);
    } catch (err) {
        console.error("Error inserting data. ", err);
        res.status(500).send('Internal Server Error');
    }

    res.status(201).send('Article successfully inserted');
});

// Updating a specific article in the database
app.put('/api/articles/:id', async (req, res) => {
    const { data } = req.body;
    const { id } = req.params;

    console.log("Received PUT request from client: ", data);

    if (!data) {
        res.status(400).send('Bad Request');
        return;
    }

    try {
        await updateData(id, data);
    } catch(err) {
        console.error("Error updating data. ", err);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Article successfully updated');
});

// Deleting a specific article from the database
app.delete('/api/articles/:id', async (req, res) => {
    const { id } = req.params;

    console.log("Received DELETE request from client.");
    
    if (!id) {
        res.status(400).send('Bad Request');
        return;
    }

    try {
        await deleteData(id);
    } catch(err) {
        console.error("Error deleting data. ", err);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Article successfully deleted');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});