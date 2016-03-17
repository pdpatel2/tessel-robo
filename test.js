var http = require('http')
var server = http.createServer();
var tessel = require('tessel')
// var camera = require('camera-vc0706').use(tessel.port['A']);
var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['A']);
var servo1 = 1

// server.on('request', function (req, res) {
//     if (req.url === '/') {
//         camera.takePicture(function (err, image) {
//             if (err) return console.error(err);
//             res.setHeader('Content-Type', 'image/jpg');
//             res.end(image, 'binary');
//         });
//     }
// });


// servo.on('ready', function () {
//   var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

//   //  Set the minimum and maximum duty cycle for servo 1.
//   //  If the servo doesn't move to its full extent or stalls out
//   //  and gets hot, try tuning these values (0.05 and 0.12).
//   //  Moving them towards each other = less movement range
//   //  Moving them apart = more range, more likely to stall and burn out
//   servo.configure(servo1, 0.05, 0.12, function () {
//     setInterval(function () {
//       console.log('Position (in range 0-1):', position);
//       //  Set servo #1 to position pos.
//       servo.move(servo1, position);

//       // Increment by 10% (~18 deg for a normal servo)
//       position += 0.1;
//       if (position > 1) {
//         position = 0; // Reset servo position
//       }
//     }, 500); // Every 500 milliseconds
//   });
// });

servo.on('ready', function () {
  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).
  server.listen(1337, function() {
  	console.log('server is listening!!')
  })

  //  Set the minimum and maximum duty cycle for servo 1.
  //  If the servo doesn't move to its full extent or stalls out
  //  and gets hot, try tuning these values (0.05 and 0.12).
  //  Moving them towards each other = less movement range
  //  Moving them apart = more range, more likely to stall and burn out
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval(function () {
      console.log('Position (in range 0-1):', position);
      //  Set servo #1 to position pos.
      servo.move(servo1, position);

      // Increment by 10% (~18 deg for a normal servo)
      position += 0.1;
      if (position > 0.9) {
        position = 0.1; // Reset servo position
      }
    }, 500); // Every 500 milliseconds
  });
});

// camera.on('ready', function () {
//     server.listen(1337, function () {
//         console.log('Server listening! Wohoo!');
//     });
// });
