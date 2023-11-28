const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const cors = require('cors');

// Middleware for parsing JSON
app.use(express.json());

// Middleware for CORS
app.use(cors({
  origin: ['https://aigostarcooking.com', 'https://www.aigostarcooking.com', 'http://aigostarcooking.com.s3-website-us-east-1.amazonaws.com', 'http://production-aigostar-cooking.s3-website-us-east-1.amazonaws.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Allow CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
const stripeRoutes = require('./routes/stripeRoutes');
app.use('/stripeRoutes', stripeRoutes);

const awsRoutes = require('./routes/awsRoutes');
app.use('/awsRoutes', awsRoutes);

const authentication = require('./routes/authentication');
app.use('/authentication', authentication);

// Define the root URL route
app.get('/', (req, res) => {
  res.send('Welcome to your API');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

// HTTPS options
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/archive/api.aigostarcooking.com/privkey1.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/api.aigostarcooking.com/fullchain1.pem', 'utf8'),
};

// Start the server with HTTPS
const port = process.env.PORT || 3001;
https.createServer(httpsOptions, app).listen(port, () => {
  console.log('Server is running on port ' + port + ' with HTTPS');
});
