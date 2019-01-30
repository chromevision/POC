var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
const fs = require('fs');
const { azureKey } = require('./secrets');
const db = require('./db');
const { User, Emotion } = require('./models/index');

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

var params = {
	returnFaceId: 'true',
	returnFaceLandmarks: 'false',
	returnFaceAttributes: 'emotion'
};

app.get('/api/users', async (req, res, next) => {
	try {
		const userList = await User.findAll();
		res.send(userList);
	} catch (error) {
		next(error);
	}
});

app.post('/api/webcam', async (req, res, next) => {
	try {
		console.log(req.headers.tokenid);
		console.log(req.headers.taburl);
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
		// do not remove the response
		res.send('resoponse');
	} catch (error) {
		next(error);
	}
});

app.listen(3000, function() {
	console.log('Listening on port 3000!');
});

module.exports = app;
