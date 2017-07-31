var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1')

client.on('connect', function(){
    client.subscribe('application/#')
})
client.on('message', function(topic, message){
    // console.log(message.toString())
    var obj = JSON.parse(message.toString())
    console.log(`${obj.devEUI}[${obj.fPort}]: ${obj.data}`)
    if(!obj.data){
        return
    }
    var data = Buffer.from(obj.data, 'base64')
    console.log(data)
    if(obj.fPort === 222){
        printSerial(data)
    }
})

function printSerial(data){
    // 0xFE Length, payload 0xEF
    if(data.length > 1){
        console.log('串口接收数据长度:', data.length)
        var strBuf = data //.slice(1, data.length - 1)
        console.log(strBuf.toString())
    }
}

// var b = new Buffer.from('ef323334fe', 'hex')
// printSerial(b)