/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');
var pricing = new AWS.Pricing();
var ses = new AWS.SES();

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/**********************
 * Example get method *
 **********************/

app.get('/products', function(req, res) {
  //Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/products/*', function(req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/products', function(req, res) {
  // Add your code here
  //res.json({ success: 'post call succeed!', url: req.url, body: req.body });
  pricing.getProducts(req.body.params, function(err, data) {
    if (err) res.json({ error: err, url: req.url });
    // an error occurred
    else {
      res.json(data.PriceList);
    }
  });
});

app.post('/attributes', function(req, res) {
  pricing.getAttributeValues(req.body.params, function(err, data) {
    if (err) res.json({ error: err, url: req.url });
    // an error occurred
    else res.json(data); // successful response
  });
  //res.json({ success: 'ebs post call succeed!', url: req.url, body: req.body });
});

app.post('/services', function(req, res) {
  pricing.describeServices(req.body.params, function(err, data) {
    if (err) res.json({ error: err, url: req.url });
    // an error occurred
    else res.json(data); // successful response
  });

  //res.json({ success: 'ebs post call succeed!', url: req.url, body: req.body });
});

app.post('/email', function(req, res) {
  const { contact, reason, customer, message } = req.body.params;

  var params = {
    Destination: {
      BccAddresses: [],
      CcAddresses: ['ropujari@amazon.com'],
      ToAddresses: ['ropujari@amazon.com']
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<p>${customer}, ${contact}</p>
          <p>Message:</p>
          <div class="multiline">${message}</div>
          <p>&nbsp;</p>
          <p>--</p>
          <p>Thank You,</p>
          <p>AWS Partner Team</p>`
        }
        // Text: {
        //   Charset: 'UTF-8',
        //   Data: 'This is the message body in text format.'
        // }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Splunk Page - ${reason}`
      }
    },

    Source: 'ropujari@amazon.com'
  };
  ses.sendEmail(params, function(err, data) {
    if (err) res.json({ error: err, url: req.url });
    // an error occurred
    else res.json(data); // successful response
    /*
     data = {
      MessageId: "EXAMPLE78603177f-7a5433e7-8edb-42ae-af10-f0181f34d6ee-000000"
     }
     */
  });
  // Add your code here
});

/****************************
 * Example post method *
 ****************************/

app.put('/products', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/products/*', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/products', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/products/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
