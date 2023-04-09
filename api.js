import newsletterSubscriberSchema from './models/newsletterSubscriber';
import ebookUserSchema from './models/ebookUser';
import * as VARS_DATA from './src/environments/vars.json';

const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

export function initAPI(app, websiteName) {
    const VARS = VARS_DATA[websiteName]; 
    const MAIN_EMAIL = 'denisltc@gmail.com';

    // logging of requests
    app.use('/api/*', (req, res, next) => {
        console.log(req.method, req.originalUrl);
        return next();
    })

    // get websiteName
    app.get("/api/websiteName", (req, res) => {
        res.send(JSON.stringify({websiteName: process.env.website}));
    });

    // set necessary vars before sending email
    const CLIENT_ID = process.env.clientId,
        CLIENT_SECRET = process.env.clientSecret,
        REFRESH_TOKEN = process.env.refreshToken;

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

    // Send inquiry email
    app.post("/api/sendmail", (req, res) => {
        console.log("New machine inquiry request received");
        let user = req.body;
        let websiteName = VARS.pageTitle;
        let subject = `${websiteName}: New Inquiry about ${user.machineType}`;
        let header = `Interested in ${user.machineType}`;
        if (user.machineType == "other") {
            subject = `${websiteName}: General Inquiry`;
            header = `General Inquiry`;
        }

        const mailOptions = {
            from: VARS.officeEmail,
            to: VARS.personalEmail,
            subject: subject,
            generateTextFromHTML: true,
            html: `
                <h2>${header}</h2>
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
                console.log('Failed to send email');
                res.send(error);
            } else {
                console.log('Email sent successfully');
                res.send(response);
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
            subject: `📗 ${user.firstname}, Here's the Healthy Water eBook you requested!`,
            generateTextFromHTML: true,
            html: `
                <div>Hi ${user.firstname}!</div>
                <b>Your "Healthy Water eBook" is here !</b>
                <div>The eBook you requested is attached to this email.</div>
                <div>I am so happy for you to discover this amazing water just like I did! I could hardly believe it when they told me that changing my water could change my life.</div>
                <div>But, I'm so delighted I took the time to discover Kangen Water, because it truly has changed my life!</div>
                <div>Don't delay! Dig in! Call me, text me, email me, I have incredible stories from thousands of other people to share with you! Can't wait to hear from you!</div>
                <h4><em>Change Your Water, Change Your Life!</em></h4>
                
                <div>All the best,</div>
                <b>${VARS.title}</b>
                <div>${VARS.distributor}</div>
                <div>${VARS.location}</div>
                <div>${VARS.phone}</div>
                <div><a href='mailto:${VARS.personalEmail}'>${VARS.personalEmail}</a></div>
                <div><a href='${VARS.domainName}'>${VARS.domainName}</a></div>
            `,
            attachments: [
                {
                    filename: 'FREE_Healthy_Water_eBook_EN.pdf',
                    path: 'https://drive.google.com/uc?export=view&id=1Jqu0wgVadCNy_RtHAW-c0HRQ2Z12g6rd'
                },
                {
                    filename: 'FREE_Healthy_Water_eBook_FR.pdf',
                    path: 'https://drive.google.com/uc?export=view&id=1-UKf55BFdJJQRlTeznaxQG7nHcweC40K'
                }
            ]
        };

        // send ebook email
        smtpTransport.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log('Failed to send ebook');
                res.send(error);
            } else {
                console.log('Ebook sent successfully');
                res.send(response);
            }
            smtpTransport.close();
        });

        // send report to main_email
        let pageTitle = VARS.pageTitle;
        let newsletterMsg = 'Does not want to receive newsletter.';
        if (user.newsletter) {
            newsletterMsg = 'Also wants to receive newsletter.';
        }
        const mailOptions2 = {
            from: VARS.officeEmail,
            to: MAIN_EMAIL,
            subject: `New eBook Download at ${pageTitle}`,
            generateTextFromHTML: true,
            html: `
                <div>Note: ${newsletterMsg}</div><br/>
                <b>FROM:</b>
                <div>${user.firstname} ${user.lastname}</div>
                <div>${user.phone}</div>
                <div><a href="mailto:${user.email}">${user.email}</a></div>
            `
        };
    
        smtpTransport.sendMail(mailOptions2, (error1, response1) => {
            if (error1) {
                console.log('Failed to send report');
            } else {
                console.log('Report sent successfully');
            }
            smtpTransport.close();
        });
    });

    // add newsletterSubscriber
    app.post("/api/newsletterSubscribers/add", (req, res) => {
        let obj = new newsletterSubscriberSchema(req.body)
        obj.save(function(err, response) {
            if (err) {
                console.log("newsletterSubscriber already exists");
            }
            else {
                console.log("newsletterSubscriber added successfully");
            }
        });
    });

    // get all newsletterSubscribers
    app.get("/api/newsletterSubscribers/all", (req, res) => {
        newsletterSubscriberSchema.find(function(err, response) {
            if (err) {
                console.log("Failed to getAll newsletterSubscribers");
                res.send(err.message);
            }
            else {
                res.send(response);
            }
        });
    });

    // add ebookUser
    app.post("/api/ebookUser/add", (req, res) => {
        let obj = new ebookUserSchema(req.body)
        obj.save(function(err, response) {
            if (err) {
                console.log("ebookUser already exists");
                res.send(err.message);
            }
            else {
                console.log("ebookUser added successfully");
                res.send(response);
            }
        });
    });
}