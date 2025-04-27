const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function AddEducationInquiry(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Inquiries");

    const {
      packageId,
      studentName,
      email,
      phone,
      preferredStartDate,
      additionalDetails,
    } = req.body;

    await collection.insertOne({
      packageId: ObjectId.createFromHexString(packageId),
      studentName,
      email,
      phone,
      preferredStartDate,
      additionalDetails,
      status: "Pending",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Inquiry Submitted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddEducationInquiry };
