// your Twilio AccountSid and AuthToken
var account_sid = "AC8d0e6c71271bafd78284004b1e5e33bb";
var auth_token = "9275bf38c98458440daa03c8b81e3500";
var twilio_num = "4243638867";
var number = "9496484798"; // The number you want to text the information to
var client = require('twilio')(account_sid, auth_token);
// var twilio = require('twilio');
// var client = new twilio.RestClient(account_sid, auth_token);
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var last_movement = 0.0;
var last_movement_time = Date.now();

accel.on('ready', function () {
  // Stream accelerometer data
  accel.on('data', function (xyz) {
    console.log( xyz );
  });
});
 
accel.on('error', function(err){
  console.log('Error:', err);
});


accel.on('ready', function () {
  // Stream accelerometer data
  accel.setOutputRate(1.56, function rateSet() {
    accel.setScaleRange( 8, function scaleSet() {
      accel.on('data', function (xyz) {
        if(Math.abs(xyz[0]) < 0.2 && Math.abs(xyz[2]) < 0.2) {
          console.log('xyz is small')
          camera.takePicture(function (err, image) {
              if (err) return console.error(err);
              // process.sendfile('audience.jpg', image);
              sendText(number, twilio_num, "Your friend sat for " + Math.round( minutes ) + " minutes");
          });
        }
      });
    });
  });
});


            // sendText(number, twilio_num, "Your friend sat for " + Math.round( minutes ) + " minutes");

// sendText( number, twilio_num, "This text message was sent by Tessel. Cool, right?!");
function sendText(to,from,msg) {
  client.sms.messages.create({
    to: to,
    from: from,
    body:msg
  }, function(error, message) {
    if (!error) {
      console.log('Success! The SID for this SMS message is:');
      console.log(message.sid);
      console.log('Message sent on:');
      console.log(message.dateCreated);
    } else {
      console.log('Oops! There was an error.', error);
    }
  });
}