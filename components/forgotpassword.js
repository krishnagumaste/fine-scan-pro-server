import { checkPhoneNumber, changePasswordDatabase } from "./mongodb/database.js";
import { sendOTP, verifyOTP } from "./twilio/twilio.js";

export const handleForgotPassword = async (req,res) => {
    const phone_number = req.body.phone;

    try{
        const result = await checkPhoneNumber(phone_number);

        if(!result){
            return res.status(409).json({
                message: "Phone Number doesn't exists."
            })
        } else {
            try {
                const result = await sendOTP(phone_number);
                res.status(200).json({
                    verification_sid: result,
                    message: "OTP sent to Phone Number Successfully",
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Failed to send OTP to the Phone Number",
                });
            }
        }

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

export const handleForgotPasswordVerifyOtp = async (req,res) => {
    const phone_number = req.body.phone_number;
    const { otp } = req.body;

    try {
        const result = await verifyOTP(phone_number, otp);

        if(result){
            res.status(200).json({
                result: true,
                message: "OTP verified",
            });
        } else {
            res.status(500).json({
              result: false,
              message: "Unable to verify otp",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something broke!",
        });
    }
}

export const changePassword = async (req,res) => {
    const phone_number = req.body.phone_number;
    const password = req.body.password;

    try {
        const result = await changePasswordDatabase(phone_number,password);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something broke!",
        });
    }
}