const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function DeleteTeacher(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Teachers");

    const { id } = req.body;

    const existingTeacher = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Inactive" } }
    );

    return res
      .status(200)
      .json({ message: "Teacher status updated to Inactive" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { DeleteTeacher };
