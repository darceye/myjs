'use strict'

// support console cmd ///////////////////////////////////////////
var filename = ""
var output_filename = ""
if (process.argv.length > 2) {
    filename = process.argv[2]
    if (process.argv.length > 3) {
        output_filename = process.argv[3]
        console.log(process.argv[3])
    }
} else {
    console.log('particlej2p.js: 将Egret的粒子编辑器生成的json粒子文件转为cocos可以识别的plist粒子文件. 如没有输出文件名, 则以_cc.plist结尾. \n用法: node particlej2p.js <输入文件名> [-c]|[输出文件名]\n-c 输出到命令行')
    return;
}
// main logic //////////////////////////////////////////////
var plist = require('plist-json')
var fs = require('fs')
var origin = JSON.parse(fs.readFileSync(filename).toString())

function blendStr2Num(str){
    switch(str){
        case "zero": 
            return 0;
        case "one":
            return 1;
        case "srcColor":
        case "sourceColor":
            return 768;
        case "oneMinusSrcColor":
        case "oneMinusSourceColor":
            return 769;
        case "srcAlpha":
        case "sourceAlpha":
            return 770;
        case "oneMinusSrcAlpha":
        case "oneMinusSourceAlpha":
            return 771;
        case "dstColor":
        case "destinationColor":
            return 774;
        case "oneMinusDstColor":
        case "oneMinusDestinationColor":
            return 775;
        case "dstAlpha":
        case "destinationAlpha":
            return 772;
        case "oneMinusDstAlpha":
        case "oneMinusDestinationAlpha":
            return 773;
        case "srcAlphaSaturate":
            return 776;
        default:
            console.log("Unknown blend function name: ", str)
            return 0
    }
}


var cc_json = {

blendFuncDestination: blendStr2Num(origin.blendFactorDestination),
blendFuncSource:  blendStr2Num(origin.blendFactorSource),
duration: origin.duration,
angle: origin.emitAngle,
angleVariance: origin.emitAngleVariance,
sourcePositionx:  origin.emitter.x,
sourcePositiony: origin.emitter.y,
emitterType: origin.emitterType,
sourcePositionVariancex: origin.emitterVariance.x,
sourcePositionVariancey: origin.emitterVariance.y,
finishColorAlpha: origin.endAlpha,
finishColorVarianceAlpha: origin.endAlphaVariance,
finishColorBlue: origin.endBlue,
finishColorVarianceBlue: origin.endBlueVariance,
finishColorGreen: origin.endGreen,
finishColorRed: origin.endRed,
finishColorVarianceRed: origin.endRedVariance,
rotationEnd: origin.endRotation,
rotationEndVariance: origin.endRotationVariance,
finishParticleSize: origin.endSize,
finishParticleSizeVariance: origin.endSizeVariance,

// 原为origin.engGreenVariance, 应该是打错了...然而1.2.2的Egret Feather没有提供修改颜色功能, 故当前应该先不管他
finishColorVarianceGreen: origin.endGreenVariance, 

gravityx: origin.gravity.x,
gravityy: origin.gravity.y,
particleLifespan: origin.lifespan,
particleLifespanVariance: origin.lifespanVariance,
maxParticles: origin.maxParticles,
maxRadius: origin.maxRadius,
maxRadiusVariance: origin.maxRadiusVariance,
minRadius: origin.minRadius,
minRadiusVariance: origin.minRadiusVariance,
radialAcceleration: origin.radialAcceleration,
radialAccelVariance: origin.radialAccelerationVariance,
rotatePerSecond: origin.rotatePerSecond,
rotatePerSecondVariance: origin.rotatePerSecondVariance,
speed: origin.speed,
speedVariance: origin.speedVariance,
startColorAlpha: origin.startAlpha,
startColorVarianceAlpha: origin.startAlphaVariance,
startColorBlue: origin.startBlue,
startColorVarianceBlue: origin.startBlueVariance,
startColorGreen: origin.startGreen,
startColorVarianceGreen: origin.startGreenVariance,
startColorRed: origin.startRed,
startColorVarianceRed: origin.startRedVariance,
rotationStart: origin.startRotation,
rotationStartVariance: origin.startRotationVariance,
startParticleSize: origin.startSize,
startParticleSizeVariance: origin.startSizeVariance,
tangentialAcceleration: origin.tangentialAcceleration,
tangentialAccelVariance: origin.tangentialAccelerationVariance,
textureFileName: origin.texture,
}

var output = plist.build(cc_json)


// output logic ////////////////////////////////////////////////
if (output_filename == '-c') {
    console.log(output)
} else {
    if(output_filename == ''){
        var pos = filename.toLowerCase().search(".json$")
        output_filename = filename.slice(0, pos) + "_cc.plist"
    }

    console.log('输出到文件: ', output_filename)
    fs.writeFileSync(output_filename, output)
}