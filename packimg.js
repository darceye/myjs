var filename = ""
var output_filename = "output.packimg"
if (process.argv.length > 2) {
    filename = process.argv[2]
    if (process.argv.length > 3) {
        output_filename = process.argv[3]
        console.log(process.argv[3])
    }
} else {
    console.log('packimg.js: 将html/js/css中引用的jpg,png文件用base64替代. 注意: 文件中引用的图片必须从当前目录下运行的能够找到. \n用法: node packimg.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}

var date = new Date()
console.log(date)

var fs = require('fs')
var origin = fs.readFileSync(filename).toString();

var imgs = []
findregex(origin, "[\"'(][a-zA-Z0-9_/\.]*?\.[Jj][Pp][Gg][\"')]", imgs)
findregex(origin, "[\"'(][a-zA-Z0-9_/\.]*?\.[Pp][Nn][Gg][\"')]", imgs)
console.log(imgs)

origin = replaceImgsWithBase64(origin, imgs, "")


if (output_filename == '-c') {
    console.log(origin)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, origin)
}

////////////// functions ///////////////////////
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
                console.log("searching: " + imgs[i])
                
                return;
            }
        }
    }
    return str
}