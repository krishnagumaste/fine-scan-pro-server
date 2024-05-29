import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { sendOTP, verifyOTP } from "./twilio/twilio.js";
import { checkEmail, checkPhoneNumber, addNewUser } from "./mongodb/database.js";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const handleSignup = async (req,res) => {
    try{
        const result = await checkEmail(req.body.email);

        if(result){
            return res.status(409).json({
                message: "Email already exists."
            })
        }

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

    try{
        const result = await checkPhoneNumber(req.body.phone_number);

        if(result){
            return res.status(409).json({
                message: "Phone number already exists."
            })
        }

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

    const { name, email, phone_number, password } = req.body;

    const token = jwt.sign(
        { name, email, phone_number, password },
        jwtSecretKey
    );

    try {
        const result = await sendOTP(phone_number);
        res.status(200).json({
            token: token,
            verification_sid: result,
            message: "OTP sent to Phone Number Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to send OTP to the Phone Number",
        });
    }
};

export const handleVerifyOtp = async (req,res) => {
    const { otp } = req.body;
    const { name, email, phone_number, password } = req.decoded;
    // console.log(name,email,phone_number,password);

    try {
        const result = await verifyOTP(phone_number, otp);

        if(result) {
            const user_id = uuidv4().toString("hex");

            const data = {
                user_id: user_id,
                name: name,
                email: email,
                phone_number: phone_number,
                password: password
            }

            const result = await addNewUser(data);

            if(result){
                res.status(200).json({
                    result: true,
                    user_id: user_id,
                    message: "New User Added Successfully",
                });
            } else {
                res.status(500).json({
                  result: false,
                  message: "Unable to add new user",
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something broke!",
        });
    }
};

export const handleVerifyToken = (req, res, next) => {
    const token = req.body.token;
  
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.decoded = decoded;
      next();
    });
  };