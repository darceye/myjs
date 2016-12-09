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
    console.log('plist2json.js: 将plist转为json.  \n用法: node plist2json.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}
// main logic //////////////////////////////////////////////
var plist = require('plist')
var fs = require('fs')
var origin = fs.readFileSync(filename).toString();

var output = plist.parse(origin)

// output logic ////////////////////////////////////////////////
if (output_filename == '-c') {
    console.log(output)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, output)
}