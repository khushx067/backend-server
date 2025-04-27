const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function EditSubject(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Subjects");

    const { id, name, description, teacherId, image } = req.body; // Get data from request body

    const existingSubject = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const updatedData = {
      name: name || existingSubject.name,
      description: description || existingSubject.description,
      teacherId: teacherId
        ? ObjectId.createFromHexString(teacherId)
        : existingSubject.teacherId,
      image: image || existingSubject.image,
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return res.status(200).json({ message: "Subject Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { EditSubject };
