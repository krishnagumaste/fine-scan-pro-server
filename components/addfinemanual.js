import { addNewFine } from "./mongodb/database.js";

const violations = {
  'No Helmet' : "1000",
  'No Seat Belt' : "1000",
  'Drink and Drive' : "1000",
  'Jumping Red Signal' : "1000",
  'Speeding' : "1000",
  'Rash Driving' : "1000",
  'Driving In Wrong Way' : "1000",
  'No Parking' : "1000",
  'Driving Without License' : "1000",
  'Lapsed Insurance' : "1000",
};

export const handleAddFineManual = async (req,res) => {

    try {
        const date = new Date();
        const data = {
            image : req.body.image,
            fine_type : req.body.type,
            fine_location : req.body.location,
            fine_amount : violations[req.body.type],
            fine_date : (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()),
            fine_time : (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()),
            license_plate_number : req.body.plate_number,
        };

        const result = await addNewFine(data);

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