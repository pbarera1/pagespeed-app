require('dotenv').config();
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const pagespeed = require('./routes/pagespeed.route');
const app = express();
const API_KEY = process.env.GOOGLE_API_KEY;
const API_BASE = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const dev = process.env.NODE_ENV !== 'production';
const serverUrl = dev ? 'http://localhost' : 'http://psi.recoverybrands.com';

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(encodeURI(mongoDB));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/pagespeed', pagespeed);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

const pageSpeedFetch = async templateData => {
    try {
        console.log(
            `${API_BASE}?url=${
                templateData.pageUrl
            }&locale=us&key=${API_KEY}&strategy=mobile&locale=en_US`
        );
        let response = await fetch(
            `${API_BASE}?url=${
                templateData.pageUrl
            }&locale=us&key=${API_KEY}&strategy=mobile&locale=en_US`
        );
        let data = await response.json();
        const newData = {
            loadingExperience: data.loadingExperience.overall_category,
            originLoadingExperience: data.originLoadingExperience.overall_category,
            lighthousePerformanceScore:
                data.lighthouseResult.categories.performance.score,
            product: templateData.product,
            site: templateData.site,
            pageUrl: templateData.pageUrl,
            templateId: templateData._id,
            date: Date.now()
        };
        return newData;
    } catch (error) {
        return {
            error
        };
    }
};

// 0 0 * * * everday at midnight or * * * * * every minute or 12:15 15 0 * * *
cron.schedule('15 0 * * *', async function() {
    console.log('running a task at 12:15');
    //mongo call to get saved templates
    let templates;
    try {
        response = await fetch(`${serverUrl}/pagespeed/get-templates`);
        templates = await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
    // console.log(templates);
    Array.isArray(templates) &&
        templates.forEach(async template => {
            // how do I assciate the pagespeed object with its corresponding template schema
            const data = await pageSpeedFetch(template);
            const savePagespeedData = await fetch(`${serverUrl}/pagespeed/create`, {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify({...data}),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const success = await savePagespeedData.text();
            console.log(success);
        });
    // api responses get saved into mongo so FE can query mongo
});
