'use strict';
require('dotenv').config();

 var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
 var Message = require('azure-iot-device').Message;

// Pull in variables
var iotHost = process.env.IOT_HOST;
var deviceKey = process.env.DEVICE_KEY;
var deviceId = process.env.DEVICE_ID;

// Connect to Azure IoT Hub
var connectionString = 'HostName=' + iotHost +';DeviceId=' + deviceId + ';SharedAccessKey=' + deviceKey;
var client = clientFromConnectionString(connectionString);

// Used to display output
function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function (err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function(){
            var randSensorValue = Math.random() * 10;
            var data = JSON.stringify({ 
                deviceId: deviceId, 
                nurseryid: 1,
                rowid: 222,
                sensorid: 99,
                strain: 'nodejs',
                minvalue: 1,
                maxvalue: 6,
                currentvalue: randSensorValue,
                sensortype: 'PH'
            });
            var message = new Message(data);
            console.log("Sending message: " + message.getData());
            client.sendEvent(message, printResultFor('send'));
        }, 1000);
    }
};

 client.open(connectCallback);