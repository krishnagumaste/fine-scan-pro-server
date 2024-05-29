import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import formidable from "formidable";
import { handleTest } from "./components/test.js";
import { handleAdminLogin, handleLoginEmail, handleLoginPhoneNumber, handleTrafficPoliceLogin } from "./components/login.js";
import { handleSignup, handleVerifyToken, handleVerifyOtp } from "./components/signup.js";
import { handleDriverDetails } from "./components/driverdetails.js";
import { handleVehicleDetails } from "./components/vehicledetails.js";
import { handleFineDetails } from "./components/finedetails.js";
import { handleAddFine } from "./components/addfine.js";
import { handleGetUrl, handleImageUrl } from "./components/geturl.js";
import { handleGetNumberPlate } from "./components/getnumberplate.js";
import { changePassword, handleForgotPassword, handleForgotPasswordVerifyOtp } from "./components/forgotpassword.js";
import { handleAddFineManual } from "./components/addfinemanual.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if(req.is('multipart/form-data')) {
      const form = formidable({ multiples: true });
  
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        req.body = fields;
        next();
      });
    } else {
      next();
    }
  });

app.get("/test", handleTest);

app.post("/login/user/email", handleLoginEmail);

app.post("/login/user/phone_number", handleLoginPhoneNumber);

app.post("/signup/user", handleSignup);

app.post("/login/police", handleTrafficPoliceLogin);

app.post("/login/admin", handleAdminLogin);

app.post("/verifyotp", handleVerifyToken, handleVerifyOtp);

app.post("/details/driver", handleDriverDetails);

app.post("/details/vehicle", handleVehicleDetails);

app.post("/details/fine", handleFineDetails);

app.post("/addfine", handleAddFine);

app.post("/addfinemanual", handleAddFineManual);

app.post("/geturl", handleGetUrl);

app.post("/imageurl", handleImageUrl);

app.post("/getnumberplate", handleGetNumberPlate);

app.post("/forgotpassword", handleForgotPassword);

app.post("/forgotpassword/verifyotp", handleForgotPasswordVerifyOtp);

app.post("/forgotpassword/changepassword", changePassword);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
