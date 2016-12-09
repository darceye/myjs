var fs = require('fs')

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

if(process.argv.length > 2){
  var filename = process.argv[2]
  console.log(base64_encode(filename))
}




// console.log(process.argv)
