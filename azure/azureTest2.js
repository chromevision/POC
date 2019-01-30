var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
const fs = require('fs');
const { azureKey } = require('./secrets');
const db = require('./db');
const { User, Emotion } = require('./models/index');
const path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(
  bodyParser.raw({
    type: 'application/octet-stream',
    limit: '10mb',
  })
);
app.use(express.static(path.join(__dirname, '../..', 'webapp', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'webapp/public/index.html'));
})


const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

var params = {
  returnFaceId: 'true',
  returnFaceLandmarks: 'false',
  returnFaceAttributes: 'emotion',
};


app.get('/api/emotions', async (req, res, next) => {
  try {
    const allEmotions = await Emotion.findAll();
    res.send(allEmotions);
  } catch (error) {
    next(error);
  }
})

app.get('/api/emotions/:id', async (req, res, next) => {
  try {
    const allEmotionsForUser = await Emotion.findAll({
      where: {
        userTokenId: req.params.id
      },
      include: [{all: true}]
    })
    res.send(allEmotionsForUser);
  } catch (error) {
    next(error);
  }
})

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
    const { tokenid, taburl } = req.headers;
    console.log(req.headers.tokenid);
    console.log(req.headers.taburl);
    const options = {
      uri: uriBase,
      qs: params,
      body: req.body,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': azureKey,
      },
    };
    let emotionObj;
    await request.post(options, async (error, response, body) => {
      try {
        if (error) {
          console.log('Error: ', error);
          return;
        }
        let jsonObj = JSON.parse(body);
        let jsonResponse = JSON.stringify(jsonObj, null, '  ');
        console.log('JSON response:', jsonResponse);
        emotionObj = jsonObj[0].faceAttributes.emotion;
        emotionObj.url = taburl;
        emotionObj.userTokenId = tokenid;
        console.log('emo', emotionObj);
        await Emotion.create(emotionObj);
      } catch (error) {
        next(error);
      }
    });
    // do not remove the
    res.send('response');
  } catch (error) {
    next(error);
  }
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

module.exports = app;
