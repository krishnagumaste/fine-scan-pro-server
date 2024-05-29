import { getObject } from './aws/aws.js';
import axios from 'axios';

export const handleMlModel = async (image) => {
    try {
        const url = await getObject(image);
    
        const response = await axios.get(url, { responseType: "arraybuffer" });
    
        if (response.status === 200) {
          const imageBuffer = response.data;
          const imageBase64 = Buffer.from(imageBuffer).toString("base64");

          const temp = {
            image: imageBase64,
          }

          const result = await axios.post(`http://127.0.0.1:5001/detect_number_plate`, temp, {
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type
          },
          });

          return result.data;

        } else {
          console.error("Error downloading image. Status code:", response.status);
          return false; // Or handle the error as needed
        }
      } catch (error) {
        console.error("Error:", error);
        return false; // Or handle the error as needed
      }
}