var fs = require('fs');
const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]

if (verb === 'add') {
    fs.stat('/Users/mario/Desktop/xdml/node-demo-1/db', function (err, stat) {
        if (err == null) {
            const fileContent = fs.readFileSync('/Users/mario/Desktop/xdml/node-demo-1/db').toString()
            const list = JSON.parse(fileContent); // 反序列化

            const task = content // 获取任务
            list.push([task, false]) // 存入任务到 list
            fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', JSON.stringify(list)) // 存到数据库
            console.log(list) // 列出所有任务
        } else if (err.code === 'ENOENT') {
            fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', '')
            const list = []

            const tash = content // 获取任务
            list.push([task, false]) // 存入任务到 list
            fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', JSON.stringify(list)) // 存到数据库
            console.log(list) // 列出所有任务
        } else {
            console.log('Some other error: ', err.code);
        }
    });
} else if (verb === 'list') {
    const fileContent = fs.readFileSync('/Users/mario/Desktop/xdml/node-demo-1/db').toString()
    const list = JSON.parse(fileContent); // 反序列化
    console.log(list)
} else if (verb === 'delete') {
    const fileContent = fs.readFileSync('/Users/mario/Desktop/xdml/node-demo-1/db').toString()
    const list = JSON.parse(fileContent); // 反序列化
    const n = content // 从1开始
    list.splice(n - 1, 1)
    console.log(list)
    fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', JSON.stringify(list)) // 存到数据库
} else if (verb === 'done') {
    const fileContent = fs.readFileSync('/Users/mario/Desktop/xdml/node-demo-1/db').toString()
    const list = JSON.parse(fileContent); // 反序列化
    const n = content // 从1开始
    list[n - 1][1] = true // ['接女神'，false]
    console.log(list)
    fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', JSON.stringify(list)) // 存到数据库
} else if (verb === 'edit') {
    const fileContent = fs.readFileSync('/Users/mario/Desktop/xdml/node-demo-1/db').toString()
    const list = JSON.parse(fileContent); // 反序列化
    const n = content // 从1开始
    list[n - 1][0] = content2
    console.log(list)
    fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', JSON.stringify(list)) // 存到数据库

} else {
    console.log('你的动词是:' + verb)
    console.log('我不知道你想干啥')
}
