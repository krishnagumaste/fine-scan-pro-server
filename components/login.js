import { checkCreds, checkTrafficPolice, checkAdmin } from "./mongodb/database.js";

export const handleLoginEmail = async (req, res) => {
    const data = {email: req.body.email, password: req.body.password};

    try {
        const result = await checkCreds(data);

        if(result){
            res.status(200).json({
                message: "Authorized"
            })
        } else {
            res.status(404).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

export const handleLoginPhoneNumber = async (req,res) => {
    const data = {phone_number: req.body.phone_number, password: req.body.password};

    try {
        const result = await checkCreds(data);

        if(result){
            res.status(200).json({
                message: "Authorized"
            })
        } else {
            res.status(404).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

export const handleTrafficPoliceLogin = async (req,res) => {
    const data = {badge_no: req.body.badge_no, password: req.body.password};

    try {
        const result = await checkTrafficPolice(data);

        if(result){
            res.status(200).json({
                message: "Authorized"
            })
        } else {
            res.status(404).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

export const handleAdminLogin = async (req,res) => {
    const data = {admin_id: req.body.admin_id, password: req.body.password};

    try {
        const result = await checkAdmin(data);

        if(result){
            res.status(200).json({
                message: "Authorized"
            })
        } else {
            res.status(404).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};