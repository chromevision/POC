const router = require('express').Router();
const { Emotion } = require('../db/models');
const { azureKey } = require('../../secrets');
const request = require('request');

const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

const params = {
  returnFaceId: 'true',
  returnFaceLandmarks: 'false',
  returnFaceAttributes: 'emotion',
};

router.post('/', async (req, res, next) => {
  try {
    let emotionObj;
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
        console.log('emotion object sent to db:\n', emotionObj);
        await Emotion.create(emotionObj);
      } catch (error) {
        next(error);
      }
    });
    // this response prevents server timeout
    res.send('response');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
