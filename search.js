import alfy from 'alfy'
const url=`https://mvn.coderead.cn/search?keyword=${alfy.input}`;

const data = await alfy.fetch(url)

const items = data.results.slice(0, 10).map(result => {
    let jarName = result.value;
    let jarNames = jarName.split(':');
    return {
        title: jarNames[1],
        subtitle: jarName,
        arg: jarName
    }
})

alfy.output(items);