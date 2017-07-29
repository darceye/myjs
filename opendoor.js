var https = require('https')
/*
https://mobile.api.doordu.com/api/index.php/v6/doors/open
POST HTTP1.1
doordu-system: {"app_version":"5.7.3.016","system_version":"6.0.1","system_models":"Le X820","system_type":0}
Accept-Language: zh_CN
Package-Name: com.doordu.mobile
Authorization: Basic YTQ3YTc4OTg0ODFlYWJmNzdhMWE1Y2UwNjFmNzkwOGI6OTNmMzgyZmZmY2EyN2Y4ZTRjODBlOGQ3NWUzNzM5MGU=
Content-Type: application/x-www-form-urlencoded
Content-Length: 162
Host: mobile.api.doordu.com
Connection: Keep-Alive
Accept-Encoding: gzip
User-Agent: okhttp/3.4.1

device_type=2&token=7d383eb54b2439fcc717f273c9d7a617&room_id=4369638&door_guid=DD302EN201607-260&device_guid=ffebbb39300f5a0d&type=0&user_id=252651&door_id=534824

*/
const req = https.request({
    hostname: 'mobile.api.doordu.com',
    method: 'POST',
    path: '/api/index.php/v6/doors/open',
    headers: {
'doordu-system': `{"app_version":"5.7.3.016","system_version":"6.0.1","system_models":"Le X820","system_type":0}`,
'Accept-Language': 'zh_CN',
'Package-Name': 'com.doordu.mobile',
'Authorization': 'Basic YTQ3YTc4OTg0ODFlYWJmNzdhMWE1Y2UwNjFmNzkwOGI6OTNmMzgyZmZmY2EyN2Y4ZTRjODBlOGQ3NWUzNzM5MGU=',
'Content-Type': 'application/x-www-form-urlencoded',
'Content-Length': 162,
// Host: mobile.api.doordu.com
'Connection': 'Keep-Alive',
'Accept-Encoding': 'gzip',
'User-Agent': 'okhttp/3.4.1',
    }
}, (res)=>{
    console.log(res)
    res.on('data', (chunk)=>{
        console.log('BODY', chunk)
    })
    res.on('end', ()=>{
        console.log('NO MORE DATA')
    })
})

req.on('error', (e)=>{
    console.log('ERROR', e)
})
req.write(`device_type=2&token=7d383eb54b2439fcc717f273c9d7a617&room_id=4369638&door_guid=DD302EN201607-260&device_guid=ffebbb39300f5a0d&type=0&user_id=252651&door_id=534824`)
req.end()