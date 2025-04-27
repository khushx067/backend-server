const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function AddSubject(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Subjects");

    const { name, description, teacherId, image } = req.body;

    await collection.insertOne({
      name,
      description,
      teacherId: ObjectId.createFromHexString(teacherId),
      image,
      status: "Active",
    });

    return res.status(200).json({ message: "Subject Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddSubject };
