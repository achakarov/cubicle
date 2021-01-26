const express = require('express');
const config = require('./config/config');
const app = express();

app.get('/', (req, res) => {
   res.send('It is working!');
});


app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));