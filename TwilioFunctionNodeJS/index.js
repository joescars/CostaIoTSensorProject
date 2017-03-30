module.exports = function (context, myEventHubTrigger) {
    context.log('JavaScript eventhub trigger function processed work item:', myEventHubTrigger);

    // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-twilio
    // In this example the queue item is a JSON string representing an order that contains the name of a 
    // customer and a mobile number to send text updates to.
    var msg = "Alert | Nursery: " + myEventHubTrigger.nurseryid + ", Row: " + myEventHubTrigger.rowid + ", Strain: " + myEventHubTrigger.strain + ", Sensor: " + myEventHubTrigger.sensortype + " reading " + myEventHubTrigger.currentvalue;

    context.log(msg);

    // Even if you want to use a hard coded message and number in the binding, you must at least 
    // initialize the message binding.
    context.bindings.message = {};

    // A dynamic message can be set instead of the body in the output binding. In this example, we use 
    // the order information to personalize a text message to the mobile number provided for
    // order status updates.
    context.bindings.message = {
        body : msg,
        to : process.env["TwilioTo"]
    };

    context.done();

};
