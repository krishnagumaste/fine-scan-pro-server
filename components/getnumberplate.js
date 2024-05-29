import { handleMlModel } from "./mlmodel.js";

export const handleGetNumberPlate = async (req,res) => {
    const image = req.body.image;

  try {
    const result = await handleMlModel(image);

    if (result) {
      res.status(200).json({ number_plate: result.number_plates.join('') });
    } else {
      res.status(500).json({ message: "Failed to generate Presigned URL" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}