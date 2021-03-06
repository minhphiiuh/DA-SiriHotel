// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get our API routes
const roomTypeApi = require('./routes/roomType.api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, './dist/')));

// Set our api routes
const router = express.Router();
router.get('/', (req, res) => {
  res.send("REST API :)");
});
router.use('/roomType', roomTypeApi);
app.use('/api', router);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Create server
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
