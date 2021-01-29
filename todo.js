var fs = require('fs');

const fileContent = fs.readFileSync('/Users/mario/Desktop/xdml/node-demo-1/db').toString()
const list = JSON.parse(fileContent); // 反序列化

const verb = process.argv[2]
const content = process.argv[3]

const task = content
list.push(task)

fs.writeFileSync('/Users/mario/Desktop/xdml/node-demo-1/db', JSON.stringify(list)) // 序列化

console.log(list)
