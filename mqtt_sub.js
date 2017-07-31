var Parser = require('argparse').ArgumentParser
var parser = new Parser({versoin: '1.0', description: 'NODE MQTT subscriber',addHelp: true})
parser.addArgument([ '-H', '--host'],{help: 'host addr'});
parser.addArgument([ '-t', '--topic'],{help: 'topic'});
parser.addArgument([ '-p', '--parse'],{help: 'parse JSON keys, seperated by /'});
parser.addArgument(['-b64', '--base64'], {help: 'parse base64 keys, seperated by /'})
parser.addArgument(['-nm'], {help: 'do Not show original Message', action:'storeTrue'})
parser.addArgument(['-nt'], {help: 'do Not show full Topic', action:'storeTrue'})
var args = parser.parseArgs()
// console.log(args)
var host = args.host? args.host: '127.0.0.1'
var topic = args.topic? args.topic: '#'

console.log(`MQTT subscribe ${topic} at ${host}`)
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://' + host)

client.on('connect', function(){
    client.subscribe(topic)
})
client.on('message', function(fulltopic, message){
    if(!args.nt){
        console.log(fulltopic)
    }
    if(!args.nm){
        console.log(message.toString())
    }
    var obj
    try{
        obj = JSON.parse(message.toString())
    }catch(e){
        return
    }
    var b64keys = [], keys = []
    if(args.parse){
        keys = args.parse.split('/')
        for(var i = 0; i < keys.length; i+=1){
            var value = obj[keys[i]]
            if(value){
                console.log(keys[i], value)
            }
        }
    }
    if(args.base64){
        b64keys = args.base64.split('/')
        for(var i = 0; i < b64keys.length; i+=1){
            var value = obj[b64keys[i]]
            
            if(value){
                var data = Buffer.from(value, 'base64')
                console.log(b64keys[i], data, data.toString())
            }
        }
    }
})
