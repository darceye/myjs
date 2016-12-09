'use strict'

// support console cmd ///////////////////////////////////////////
var filename = ""
var output_filename = "output.plist"
if (process.argv.length > 2) {
    filename = process.argv[2]
    if (process.argv.length > 3) {
        output_filename = process.argv[3]
        console.log(process.argv[3])
    }
} else {
    console.log('json2plist.js: 将json转为plist. \n用法: node json2plist.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}
// main logic //////////////////////////////////////////////
var plist = require('plist-json')
var fs = require('fs')
var origin = JSON.parse(fs.readFileSync(filename).toString())

// origin = ['metadata',{tab: 'test', ttb: 123}, {tab: 'test', ttb: 123}]
// origin = {tab: 'test', ttb: 123}

var output = plist.build(origin)

// output logic ////////////////////////////////////////////////
if (output_filename == '-c') {
    console.log(output)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, output)
}