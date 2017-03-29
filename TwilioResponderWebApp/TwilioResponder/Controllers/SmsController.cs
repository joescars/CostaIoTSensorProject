using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Twilio.Mvc;
using Twilio.TwiML;
using Twilio.TwiML.Mvc;

namespace TwilioResponder.Controllers
{
    public class SmsController : TwilioController
    {
        [HttpPost]
        public ActionResult Index(SmsRequest request)
        {
            // set message based on command received
            var msg = "Invalid Command Received.";
            string cmd = request.Body.ToLower();
            switch (cmd)
            {
                case "add acid":
                    msg = "Increasing Acid Flow";
                    break;
                case "add water":
                    msg = "Increasing Water Flow";
                    break;
                case "reduce acid":
                    msg = "Reducing Acid flow";
                    break;
                case "reduce water":
                    msg = "Reducing Water Flow";
                    break;
                default:
                    msg = "Invalid Input";
                    break;
            }
            //TODO: Fire off message to event hub to trigger action on IoT Device

            // Send response back to twilio to give feedback to the user. 
            var response = new TwilioResponse();
            response.Sms(msg);
            return TwiML(response);
        }
    }
}