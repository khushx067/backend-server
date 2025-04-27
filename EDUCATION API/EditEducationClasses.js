const ConnectDB = require("../DB/t_db_connect");
const { ObjectId } = require("mongodb");

async function EditClass(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Classes");

    const { id, grade, image, description } = req.body;

    const existingClass = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const updatedData = {
      grade: grade || existingClass.grade,
      image: image || existingClass.image,
      description: description || existingClass.description,
      timestamp: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return res.status(200).json({ message: "Class Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { EditClass };
