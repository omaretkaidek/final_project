const express = require('express');
const bodyParser = require('body-parser');

const publisherRoutes = require('./module/publisher/routes/publisher.api.routes');
const bookRoutes = require('./module/book/routes/book.api.routes');
const authorRoutes = require('./module/author/Routes/author.api.routes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the user routes
app.use('/api', authorRoutes);
app.use('/api', publisherRoutes);
app.use('/api', bookRoutes);

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes, if needed
