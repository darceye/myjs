var filename = ""
var output_filename = ""
var oldstr = ""
var newstr = ""
if (process.argv.length > 5) {
    filename = process.argv[2]
    output_filename = process.argv[3]
    oldstr = process.argv[4]
    newstr = process.argv[5]
    if (output_filename == '-y') {
        output_filename = filename
    }

} else {
    console.log('replacestr.js: 替换文件中的字符串\n用法: replacestr.js <输入文件名> <输出文件名|-y|-c> <查找字符串> <替换字符串>\n-y  使用输入文件名作为输出文件名,将替换源文件\
    \n-c 输出到console')
    return;
}

var fs = require('fs')
var origin = fs.readFileSync(filename).toString();

origin = origin.replace(oldstr, newstr)

if (output_filename == '-c') {
    console.log(origin)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, origin)
}