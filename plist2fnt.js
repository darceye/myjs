'use strict'

// support console cmd ///////////////////////////////////////////
var filename = ""
var output_filename = "output.json"
if (process.argv.length > 2) {
    filename = process.argv[2]
    output_filename = filename.split(".")[0] + ".fnt"
    if (process.argv.length > 3) {
        output_filename = process.argv[3]
        console.log(process.argv[3])
    }
} else {
    console.log('plist2fnt.js: 将plist转为fnt.  \n用法: node plist2fnt.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}
// main logic //////////////////////////////////////////////
var plist = require('plist')
var fs = require('fs')
var origin = fs.readFileSync(filename).toString();

var json = plist.parse(origin)
var size = brace2array(json.metadata.size)
var output = `
info face="微软雅黑" size=32 bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=1,1 outline=0
common lineHeight=32 base=26 scaleW=${size[0]} scaleH=${size[1]} pages=1 packed=0 alphaChnl=1 redChnl=0 greenChnl=0 blueChnl=0
page id=0 file="${json.metadata.realTextureFileName}"
chars count=${Object.keys(json.frames).length}
`
for(var key in json.frames){
    var frame = json.frames[key]
    var tr = brace2array(frame.textureRect)
    var id
    if(key[0] == "_"){
        id = key.match(/_[0-9]*/)[0].slice(1)
        console.log("_id: ",id)
    }else{
        id = key[0].charCodeAt(0)
        console.log("normal id:", id)
    }
    output += `char id=${id}   x=${tr[0][0]}    y=${tr[0][1]}      width=${tr[1][0]}     height=${tr[1][1]}     xoffset=0     yoffset=0     xadvance=${tr[1][0]}     page=0  chnl=15
`
}

function brace2array(brace){
    // brace"{{1,2},{3,4}}" to [[1,2],[3,4]]
    var strA = brace.replace(/{/g, "[")
    var strA = strA.replace(/}/g, "]")
    return JSON.parse(strA)

}



// output logic ////////////////////////////////////////////////
if (output_filename == '-c') {
    console.log(output)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, output)
}