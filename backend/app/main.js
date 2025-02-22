express = require('express');
app = express();
cors = require('cors');
app.use(cors());

app.get('/api', (req, res) => {
    res.send('Hello from API');
});

app.listen(8000, () => {
    console.log('Server listening on port 3000');
});