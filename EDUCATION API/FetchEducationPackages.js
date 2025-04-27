const ConnectDB = require("../DB/t_db_connect");

async function FetchEducationPackages(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Packages");
    const data = await collection.find({ status: "Active" }).toArray();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res.status(200).json({ message: "Data Fetched", data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchEducationPackages };
