import { initAPI } from './api';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create link to Angular build directory
app.use(express.static(path.join(__dirname, "/dist/kangen/")));

// set up api
initAPI(app, process.env.website);

// Connection to MongoDB database
const mongodb_uri = process.env.mongodbUri;
mongoose.connect(mongodb_uri, {
                        useNewUrlParser : true,
                        useUnifiedTopology : true,
                        useCreateIndex : true,
                    });
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Express server running on port", port);
});
