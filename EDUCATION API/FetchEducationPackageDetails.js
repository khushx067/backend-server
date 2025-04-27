const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function FetchEducationPackageDetails(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Packages");

    const { packageId } = req.params;

    const data = await collection.findOne({
      _id: new ObjectId(packageId),
      status: "Active",
    });

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res.status(200).json({ message: "Data Fetched", Data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchEducationPackageDetails };
