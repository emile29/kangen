const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const mongoose = require('mongoose');
// const wakeUpDyno = require("./wakeUpDyno");
const OAuth2 = google.auth.OAuth2;
import newsletterSubscriberSchema from './models/newsletterSubscriber';
import ebookUser from './models/ebookUser';
import * as VARS from './vars.json';
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create link to Angular build directory
app.use(express.static(path.join(__dirname, "/dist/kangen/")));

// non-root requests being redirected
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, "/dist/kangen/index.html"));
});

const port = process.env.PORT || 8080;
// const MAIN_URL = VARS.herokuURL;
app.listen(port, () => {
    console.log("Express server running on port", port);
    // wakeUpDyno(MAIN_URL); // will start once server starts
});

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

const CLIENT_ID = process.env.clientId,
    CLIENT_SECRET = process.env.clientSecret,
    REFRESH_TOKEN = process.env.refreshToken;

// Auto-send emails about inquiries
const oauth2Client = new OAuth2(
    CLIENT_ID, // ClientID
    CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: VARS.officeEmail,
         clientId: CLIENT_ID,
         clientSecret: CLIENT_SECRET,
         refreshToken: REFRESH_TOKEN,
         accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post("/api/sendmail", (req, res) => {
    console.log("New machine inquiry request received");
    let user = req.body;

    const mailOptions = {
        from: VARS.officeEmail,
        to: VARS.personalEmail,
        subject: `New Inquiry about ${user.machineType}`,
        generateTextFromHTML: true,
        html: `
            <h2>Interested in ${user.machineType}</h2>
            <p>${user.message}</p>
            <b>FROM:</b>
            <div>${user.firstname} ${user.lastname}</div>
            <div>${user.city}, ${user.country}</div>
            <div>${user.phone}</div>
            <div><a href="mailto:${user.email}">${user.email}</a></div>
        `
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
            res.send({error: 'Failed to send email!'});
        } else {
            console.log(response);
            res.status(200).send(response);
            res.send('Email sent!');
        }
        smtpTransport.close();
    });
});

// send Ebook
app.post('/api/sendEbook', (req, res) => {
    console.log("New ebook inquiry request received");
    let user = req.body;

    const mailOptions = {
        from: VARS.officeEmail,
        to: `${user.email}`,
        subject: `Kangen Water eBook`,
        generateTextFromHTML: true,
        html: `
            <b>Enagic® Distributor:</b>
            <div>${VARS.distributor}</div>
            <div>${VARS.location}</div>
            <div>${VARS.phone}</div>
            <div><a href='mailto:${VARS.personalEmail}'>${VARS.personalEmail}</a></div>
            <div><a href='${VARS.domainName}'>${VARS.domainName}</a></div>
        `,
        attachments: [
            {
                filename: 'KangenWater_eBook.pdf',
                path: 'https://drive.google.com/uc?export=view&id=1uhEq9MPoJ5Al7GRNXFeWom-fLx3Rgzrd'
            }
        ]
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
            res.send({error: 'Failed to send ebook!'});
        } else {
            console.log(response);
            res.status(200).send(response);
            res.send('Ebook sent!');
        }
        smtpTransport.close();
    });
});

// add newsletterSubscriber
app.post("/api/newsletterSubscribers/add", (req, res) => {
    let obj = new newsletterSubscriberSchema(req.body)
    obj.save(function(err, response) {
        if (err)
            res.status(400).send(err.message);
        else {
            res.status(200).send(response);
            console.log("Subscriber added successfully!");
        }
    });
});

// get all newsletterSubscribers
app.get("/api/newsletterSubscribers/all", (req, res) => {
    newsletterSubscriberSchema.find(function(err, response) {
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).json(response);
    });
});

// add ebookUser
app.post("/api/ebookUser/add", (req, res) => {
    let obj = new ebookUser(req.body)
    obj.save(function(err, response) {
        if (err)
            res.status(400).send(err.message);
        else {
            res.status(200).send(response);
            console.log("ebookUser added successfully!");
        }
    });
});
