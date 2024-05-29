import { getVehicleDetails } from "./mongodb/database.js";

export const handleVehicleDetails = async (req,res) => {
    try {
        const result = await getVehicleDetails(req.body.license_plate_number);

        if(result){
            res.status(200).send(result);
        } else {
            res.status(404).json({
                message: "Vehicle details not found",
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to get the vehicle details",
        });
    }
};