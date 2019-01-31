const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(
  bodyParser.raw({
    type: 'application/octet-stream',
    limit: '10mb',
  })
);

app.use('/api', require('./api'));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

module.exports = app;
