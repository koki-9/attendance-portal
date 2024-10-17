const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to save data
app.post('/api/save', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, (err, jsonData) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }

        const existingData = JSON.parse(jsonData || '[]');
        existingData.push(data);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' });
            }
            res.status(200).json({ message: 'Data saved successfully!' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
