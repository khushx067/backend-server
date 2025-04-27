const ConnectDB = require("../DB/t_db_connect");

async function AddTeacher(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Teachers");

    const {
      name,
      email,
      phone,
      subjects,
      classes,
      experience,
      bio,
      profileImage,
    } = req.body;

    await collection.insertOne({
      name,
      email,
      phone,
      subjects,
      classes,
      experience,
      bio,
      profileImage,
      status: "Active",
    });

    return res.status(200).json({ message: "Teacher Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddTeacher };
