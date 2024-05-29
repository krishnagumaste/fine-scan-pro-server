import { getDriverDetails } from "./mongodb/database.js";

export const handleDriverDetails = async (req,res) => {
    try {
        const result = await getDriverDetails(req.body.license_id);

        if(result){
            res.status(200).send(result);
        } else {
            res.status(404).json({
                message: "Driver details not found",
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to get the driver details",
        });
    }
};