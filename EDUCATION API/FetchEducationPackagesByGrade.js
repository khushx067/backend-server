const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function FetchEducationPackagesByGrade(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Packages");

    const { classId } = req.params;

    const data = await collection
      .find({ "classDetails._id": new ObjectId(classId), status: "Active" })
      .toArray();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res
        .status(200)
        .json({ message: "Data Fetched", total: data.length, Data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchEducationPackagesByGrade };
