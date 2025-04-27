const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function EditTeacher(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Teachers");

    const {
      id,
      name,
      email,
      phone,
      subjects,
      classes,
      experience,
      bio,
      profileImage,
    } = req.body;

    const existingTeacher = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updatedData = {
      name: name || existingTeacher.name,
      email: email || existingTeacher.email,
      phone: phone || existingTeacher.phone,
      subjects: subjects || existingTeacher.subjects,
      classes: classes || existingTeacher.classes,
      experience: experience || existingTeacher.experience,
      bio: bio || existingTeacher.bio,
      profileImage: profileImage || existingTeacher.profileImage,
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return res.status(200).json({ message: "Teacher Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { EditTeacher };
