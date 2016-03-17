// your Twilio AccountSid and AuthToken
// var account_sid = "AC8d0e6c71271bafd78284004b1e5e33bb";
// var auth_token = "9275bf38c98458440daa03c8b81e3500";
// var twilio_num = "4243638867";
// var number = "9496484798"; // The number you want to text the information to
// var client = require('twilio')(account_sid, auth_token);
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var camera = require('camera-vc0706').use(tessel.port['B']);

var last_movement = 0.0;
var last_movement_time = Date.now();

accel.on('ready', function () {
  // Stream accelerometer data
  accel.on('data', function (xyz) {
    // console.log( xyz );
  });
});
 
accel.on('error', function(err){
  console.log('Error:', err);
});

var picCt = 0;
var picCtStr;

accel.on('ready', function () {
  // Stream accelerometer data
  accel.setOutputRate(1.56, function rateSet() {
    accel.setScaleRange( 8, function scaleSet() {
      accel.on('data', function (xyz) {
        console.log(last_movement, xyz[0].toFixed(1))
        if(last_movement !== xyz[0].toFixed(1)) {
          last_movement = xyz[0].toFixed(1);
          var minutes = ((Date.now() - last_movement_time)/1000) /60 ;
          if(minutes > .2) {
            camera.takePicture(function (err, image) {
                if (err) return console.error(err);
                picCtStr = pad(picCt);
                process.sendfile('audience' + picCtStr  + '.jpg', image);
                console.log('took pic');
                picCt ++;
                last_movement_time = Date.now();
            }); 
          }
        }
      });
    });
  });
});


function pad(n){
  if(n>99) return n.toString();
  if(n>9) return '0' + n.toString();
  return '00' + n.toString();
}




// sendText( number, twilio_num, "This text message was sent by Tessel. Cool, right?!");
