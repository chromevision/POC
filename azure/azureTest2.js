var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
const fs = require('fs');
const { azureKey } = require('./secrets');

var app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(
	bodyParser.raw({
		type: 'application/octet-stream',
		limit: '10mb'
	})
);

const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
var params = {
	returnFaceId: 'true',
	returnFaceLandmarks: 'false',
	returnFaceAttributes: 'emotion'
};

app.post('/api/webcam', async (req, res, next) => {
	try {
		// console.log('BODDYYY', req.body);
		console.log(req.headers);
		// const base64Image = Buffer.from(req.body).toString('binary');
		const options = {
			uri: uriBase,
			qs: params,
			body: req.body,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': azureKey
			}
		};
		await request.post(options, (error, response, body) => {
			if (error) {
				console.log('Error: ', error);
				return;
			}
			let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
			console.log('JSON response:', jsonResponse);
		});
		// res.send('resp');
	} catch (error) {
		next(error);
	}
});

app.listen(3000, function() {
	console.log('Listening on port 3000!');
});

module.exports = app;
