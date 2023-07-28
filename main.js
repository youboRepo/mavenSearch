import alfy from 'alfy'
import cheerio from 'cheerio'
import axios from 'axios'

const query = alfy.input
const args = query.split(":")
const url = `https://mvn.coderead.cn/version?groupId=${args[0]}&artifactId=${args[1]}`

axios.get(url).then(function(response) {
  const $ = cheerio.load(response.data);
  let items = []

    $('textarea').each((index, element) => {
      if (index <= 20) {
        let elementText = $(element).text();
        if (elementText.indexOf('<dependency>') != -1) {
          elementText = elementText.substring(elementText.indexOf('<dependency>'), elementText.length)
          const dependency = cheerio.load(elementText, { ignoreWhitespace : true, xmlMode : true});
          let artifactId = dependency('artifactId').text()
          let version = dependency('version').text()
          items.push({
            title: artifactId,
            subtitle: artifactId + ':' + version,
            arg: '                ' + elementText
          })
        }
      }
    });

    alfy.output(items);
})