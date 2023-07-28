import alfy from "alfy"

const url = `https://mvn.coderead.cn/search/class?keyword=${alfy.input}`

const data = await alfy.fetch(url)

const items = data.results.map(result => {
    return {
        title: alfy.input,
        subtitle: result.value,
        arg: result.value
    }
})

alfy.output(items)