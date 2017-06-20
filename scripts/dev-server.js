const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.use('/', express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(process.cwd()+'/build/index.html')
})

app.listen(PORT, function() {
  console.log('Example app listening on port ' + PORT + '!')
})
