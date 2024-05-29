export const handleTest = (req, res) => {
    res.status(200).json({
      author: "Krishna Gumaste",
      message: "working",
    });
  };

// import { client } from "../mongodb/mongo.js";

// export const handleTest = async (req,res) => {
//   try {
//     await client.connect();
//     res.status(200).json({
//       message: "Connected to MongoDB successfully.",
//     })
//   } catch (error) {
//     console.log("Error occurred:", error);
//     res.status(500).send("Internal Server Error");
//   } finally {
//     await client.close();
//   }
// };