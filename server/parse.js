
const path = require('path')
const FILE_PATH = path.join(__dirname, '/../', 'Docs/CFC.pro5Template')

const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

console.log(FILE_PATH)

fs.readFile(FILE_PATH, function(err, data) {
  parser.parseString(data, function (err, result) {
    console.dir(result['RVTemplateDocument']['slides'][0]['RVDisplaySlide'][0]['displayElements'][0]['RVTextElement'][0]['']);
    console.log('Done');
    

  });
});
