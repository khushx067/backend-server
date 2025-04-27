const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function DeleteSubject(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Subjects");

    const { id } = req.body;

    const existingSubject = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Inactive" } }
    );

    return res
      .status(200)
      .json({ message: "Subject status updated to Inactive" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { DeleteSubject };
