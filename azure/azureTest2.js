var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
const axios = require('axios');

var app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(
  bodyParser.raw({
    type: 'application/octet-stream',
    limit: '10mb',
  })
);

// Replace <Subscription Key> with your valid subscription key.

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
var params = {
  returnFaceId: 'true',
  returnFaceLandmarks: 'false',
  returnFaceAttributes: 'emotion',
};

app.post('/api/webcam', async (req, res, next) => {
  try {
    const base64Image = Buffer.from(req.body).toString('base64');
    // const imgurRes = await axios.post('https://api.imgur.com/3/image', {
    //   image: base64Image,
    //   type: 'base64',
    //   headers: {
    //     Authorization: `Client-ID 5feca055666f551`,
    //   },
    // });

    const imgurRes = await axios.post(
      'https://api.imgur.com/3/image',
      {
				image: `data:image/png;base64 ${base64Image}`,
        album: 'VEHhzmA'
      },
      {
        headers: {
					'content-type':
            'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          Authorization: 'Client-ID 5feca055666f551',
        },
      }
    );

    console.log('imgur respose', imgurRes);
		// const imageLink = imgurRes.data.link;
		const azureKey = '07463fe19ab1489aa9676f89bcb74fe3';
    const options = {
      uri: uriBase,
      qs: params,
      // body: ,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': azureKey,
      },
    };
    request.post(options, (error, response, body) => {
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
