var fs = require('fs')
var path = require('path')
const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]
const dbPath = path.join(__dirname, 'db')

ensureDd()

const n = content
const list = fetch()
switch (verb) {
    case 'add':
        addTask(list, content)
        break;
    case 'list':
        break;
    case 'delete':
        removeTask(list, n)
        break;
    case 'done':
        markTaskAsDone(list, n)
        break;
    case 'edit':
        editTask(list, n, content2)
        break;
    default:
        console.log('我不知道你想干啥')
        break;
}

display(list)
if (verb !== 'list') {
    save(list)
}



// 帮助函数
function ensureDd() {
    try {
        fs.statSync(dbPath)
    } catch (error) {
        fs.writeFileSync(dbPath, '')
    }
}

function save(list) {
    fs.writeFileSync(dbPath, JSON.stringify(list)) // 存到数据库
}
function fetch() {
    const fileContent = fs.readFileSync(dbPath).toString()
    let list
    try {
        list = JSON.parse(fileContent) || [] // 兜底制
    } catch (error) {
        list = []
    }
    return list
}
function display(list) {
    for (let i = 0; i < list.length; i++) {
        const mark = list[i][1] === true ? '[x]' : '[ ]'
        console.log(mark + '' + '任务内容: ' + list[i][0])
    }
}
function addTask(list, content) {
    list.push([content, false])
}
function removeTask(list, n) {
    list.splice(n - 1, 1)
}
function markTaskAsDone(list, n) {
    list[n - 1][1] = true // ['接女神',false]
}
function editTask(list, n, newContent) {
    list[n - 1][0] = newContent
}
