var filename = ""
var output_filename = "output.html"
if (process.argv.length > 2) {
    filename = process.argv[2]
    if (process.argv.length > 3) {
        output_filename = process.argv[3]
        console.log(process.argv[3])
    }
} else {
    console.log('packit.js: 将html中引用的css, js文件合并入html,并且将其中的jpg,png文件用base64替代. \n用法: node packit.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}

var date = new Date()
console.log(date)

var cheerio = require('cheerio')
var fs = require('fs')
var indexhtml = fs.readFileSync(filename);
var $ = cheerio.load(indexhtml)

// var pd = require('./js/pagesdata.js')
// console.log(pd)

var scripts = $('script')

scripts.each(function(i, element) {
    if (!$(this).attr('src')) {
        return;
    }
    var jsName = $(this).attr('src')
    if (jsName.toLowerCase() == 'js/vue.js') {
        jsName = 'js/vue.min.js'
    }
    var js = fs.readFileSync(jsName)
    $(this).replaceWith('<script>' + js + '</script>')
})

var csses = $('link[rel|="stylesheet"]')
csses.each(function(i, element) {
    var cssName = $(this).attr('href')
    if (cssName.toLowerCase() == 'css/animate.css') {
        cssName = 'css/animate.min.css'
    }
    var css = fs.readFileSync(cssName)
    $(this).replaceWith('<style>' + css + '</style>')
})

if (output_filename == '-c') {
    console.log($.html())
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, $.html())
}