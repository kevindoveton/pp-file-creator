const express = require('express');
const path = require('path');
const app = express();

app.use('', express.static('./dist', {
    root: path.resolve(__dirname)
  })
);

app.get("/*", (req, res) => {
  res.sendFile('index.html', {
    root: path.resolve(__dirname, './dist')
  })
});


app.listen(3000, function () {
  console.log('sms-ui running on 3002!')
});
