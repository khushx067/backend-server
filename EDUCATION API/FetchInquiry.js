const ConnectDB = require("../DB/t_db_connect");
const { FetchEducationClasses } = require("./FetchEducationClasses");

async function FetchEducationInquiry(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Inquiries");
    const data = await collection.find({ status: "Pending" }).toArray();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res.status(200).json({ message: "Data Fetched", data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchEducationInquiry };
