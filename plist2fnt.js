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
    output += `char id=${key[0].charCodeAt(0)}   x=${tr[0][0]}    y=${tr[0][1]}      width=${tr[1][0]}     height=${tr[1][1]}     xoffset=0     yoffset=0     xadvance=${tr[1][0]}     page=0  chnl=15
`
}

function brace2array(brace){
    // brace"{{1,2},{3,4}}" to [[1,2],[3,4]]
    var strA = brace.replace(/{/g, "[")
    var strA = strA.replace(/}/g, "]")
    return JSON.parse(strA)

}

`
char id=48   x=58    y=0     width=25    height=27    xoffset=0     yoffset=0     xadvance=25    page=0  chnl=15
char id=49   x=237   y=0     width=15    height=26    xoffset=0     yoffset=0     xadvance=15    page=0  chnl=15
char id=50   x=107   y=0     width=21    height=27    xoffset=0     yoffset=0     xadvance=21    page=0  chnl=15
char id=51   x=195   y=0     width=20    height=27    xoffset=0     yoffset=0     xadvance=20    page=0  chnl=15
char id=52   x=0     y=31    width=22    height=26    xoffset=0     yoffset=0     xadvance=22    page=0  chnl=15
char id=53   x=129   y=0     width=21    height=27    xoffset=0     yoffset=0     xadvance=21    page=0  chnl=15
char id=54   x=151   y=0     width=21    height=27    xoffset=0     yoffset=0     xadvance=21    page=0  chnl=15
char id=55   x=216   y=0     width=20    height=27    xoffset=0     yoffset=0     xadvance=20    page=0  chnl=15
char id=56   x=84    y=0     width=22    height=27    xoffset=0     yoffset=0     xadvance=22    page=0  chnl=15
char id=57   x=173   y=0     width=21    height=27    xoffset=0     yoffset=0     xadvance=21    page=0  chnl=15
char id=20851 x=29    y=0     width=28    height=28    xoffset=0     yoffset=0     xadvance=28    page=0  chnl=15
char id=31532 x=0     y=0     width=28    height=30    xoffset=0     yoffset=0     xadvance=28    page=0  chnl=15
`



// output logic ////////////////////////////////////////////////
if (output_filename == '-c') {
    console.log(output)
} else {
    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, output)
}