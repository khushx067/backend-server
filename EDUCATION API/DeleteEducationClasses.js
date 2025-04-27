const ConnectDB = require("../DB/t_db_connect");
const { ObjectId } = require("mongodb");

async function DeleteClass(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Classes");

    const { id } = req.body;

    const existingClass = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Inactive", timestamp: new Date() } }
    );

    return res
      .status(200)
      .json({ message: "Class status updated to Inactive" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { DeleteClass };
