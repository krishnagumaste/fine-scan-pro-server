import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const client = twilio(accountSid, authToken);

export const sendOTP = async (phoneNumber) => {
  client.verify.v2
    .services(serviceSid)
    .verifications.create({ to: "+91" + phoneNumber, channel: "sms" })
    .then((verification) => {
      return verification.sid;
    });
};

export const verifyOTP = async (phoneNumber, otp) => {
  return client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: "+91" + phoneNumber, code: otp })
    .then((verification_check) => {
      return verification_check.status;
    });
};
