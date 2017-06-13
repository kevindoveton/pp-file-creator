const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.use('/', express.static('build'));

app.listen(PORT, function() {
  console.log('Example app listening on port ' + PORT + '!')
})
