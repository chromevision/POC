var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '07463fe19ab1489aa9676f89bcb74fe3';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
var params = {
	returnFaceId: 'true',
	returnFaceLandmarks: 'false',
	returnFaceAttributes: 'emotion'
};

app.post('/api/webcam', (req, res, next) => {
	console.log('post data', req.body);
	res.send('resp');
	// 	const options = {
	// 		uri: uriBase,
	// 		qs: params,
	// 		body: '{"url": ' + '"' + image + '"}',
	// 		headers: {
	// 			'Content-Type': 'application/octet-stream',
	// 			'Ocp-Apim-Subscription-Key': subscriptionKey
	// 		}
	// 	};
	// 	try {
	// 		request.post(options, (error, response, body) => {
	// 			if (error) {
	// 				console.log('Error: ', error);
	// 				return;
	// 			}
	// 			let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
	// 			console.log('JSON Response\n');
	// 			console.log(jsonResponse);
	// 		});
	// 	} catch (error) {}
});

app.listen(3000, function() {
	console.log('Listening on port 3000!');
});

module.exports = app;
