/*
date 2016/11/12
copyright JacquesYQ
verion: 1.1
V1.1        Use requireFromString to read pagesdata.js
V1.0        Use string.replace to replace xxx.jpg/png to base64.
*/

'use strict'
var filename = ""
var output_filename = "output.packimg"
if (process.argv.length > 2) {
    filename = process.argv[2]
    if (process.argv.length > 3) {
        output_filename = process.argv[3]
        console.log(process.argv[3])
    }
} else {
    console.log('packimg.js(V1.1 2016/11/12)\n将html/js/css中引用的jpg,png文件用base64替代. 注意: 文件中引用的图片必须从当前目录下运行的能够找到. \n用法: node packimg.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}

var date = new Date()
console.log(date)

var fs = require('fs')
var origin = fs.readFileSync(filename).toString();

var pd = requireFromString(origin + '\nexports.pages = pages\nexports.music_file=music_file\nexports.title=title\n')

for (let i = 0 ; i<pd.pages.length;i++){
    let p = pd.pages[i]
    console.log('replacing p.background: ', i, p.background)
    p.background = replace2B64(p.background)
    for(let j = 0; j<p.images.length; j++){
        var img = p.images[j]
        console.log('replacing img: ', j, img.src)
        img.src = replace2B64(img.src)
    }
}

var output = "var pages="+JSON.stringify(pd.pages) + "\nvar music_file='" + pd.music_file + "'\nvar title='" + pd.title + "'\n"
if (output_filename == '-c') {
    console.log(output)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, output)
}

////////////// functions ///////////////////////
function replace2B64(imgName){
    if ('' == imgName){
        return imgName
    }
    var b64head = 'data:image/png;base64,'
    return b64head + base64_encode(imgName)
}

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function findregex(str, regex, matchs) {
    var subhtml = str
    var matchresult = {}
    for (var i = 0; i < 10000; i++) {
        matchresult = subhtml.match(regex)
        if (matchresult) {
            matchs.push(matchresult[0].replace("'", "").replace("'", "").replace("\"", "").replace("\"", "").replace("(", "").replace(")", ""))

            subhtml = subhtml.slice(matchresult.index + matchresult[0].length)
        } else {
            break;
        }
    }
}

function replaceImgsWithBase64(str, imgs, path) {
    var b64 = ""
    var b64head = 'data:image/png;base64,'
    for (var i = 0; i < imgs.length; i++) {
        console.log('replaceing: ', imgs[i])
        b64 = base64_encode(path + imgs[i])
        var breakWhile = 0

        while (str.search(imgs[i]) > 0) {
            str = str.replace(imgs[i], b64head + b64)
                // console.log(str.replace(imgs[i], b64head + b64))
            breakWhile++
            if (breakWhile > 100) {
                console.log("dead loop.")
                return;
            }
        }
    }
    return str
}

//////
function requireFromString(code, filename, opts) {
    var Module = require('module');
    var path = require('path');
    if (typeof filename === 'object') {
        opts = filename;
        filename = undefined;
    }

    opts = opts || {};
    filename = filename || '';

    opts.appendPaths = opts.appendPaths || [];
    opts.prependPaths = opts.prependPaths || [];

    if (typeof code !== 'string') {
        throw new Error('code must be a string, not ' + typeof code);
    }

    var paths = Module._nodeModulePaths(path.dirname(filename));

    var m = new Module(filename, module.parent);
    m.filename = filename;
    m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
    m._compile(code, filename);

    return m.exports;
}