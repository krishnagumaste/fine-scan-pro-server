import { client } from "./mongo.js";

export const checkCreds = async (data) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("User");
        
        const result = await collection.countDocuments(data);

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
}

export const checkEmail = async (email,phone_number) => {
    const data = {
        email: email,
    }
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("User");

        const result = await collection.countDocuments(data);

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
}

export const checkPhoneNumber = async (phone_number) => {
    const data = {
        phone_number: phone_number,
    }
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("User");

        const result = await collection.countDocuments(data);

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
}

export const addNewUser = async (data) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("User");

        const result = await collection.insertOne(data);

        return result;

    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
}

export const getDriverDetails = async (license_id) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("Driver");

        const data = {
            license_id: license_id
        }

        const result = await collection.findOne(data);

        return result;

    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
};

export const getVehicleDetails = async (license_plate_number) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("Vehicle");

        const data = {
            license_plate_number: license_plate_number
        }

        const result = await collection.findOne(data);

        return result;

    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
};

export const getFineDetails = async (license_plate_number) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("Fine");

        const data = {
            license_plate_number: license_plate_number
        }

        const result = await collection.find(data).toArray();

        return result;

    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
};

export const checkTrafficPolice = async (data) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("Traffic_Police");
        
        const result = await collection.countDocuments(data);

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
};

export const checkAdmin = async (data) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("Admin");
        
        const result = await collection.countDocuments(data);

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
};

export const addNewFine = async (data) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("Fine");
        
        const result = await collection.insertOne(data);

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
}

export const changePasswordDatabase = async (phone,password) => {
    try {
        await client.connect();
        const db = client.db("TrafficFineManagementSystemDB");
        const collection = db.collection("User");
        
        const result = await collection.updateOne(
            { phone_number: phone },
            { $set: { password: password } }
        );

        return result;
    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        await client.close();
    }
}