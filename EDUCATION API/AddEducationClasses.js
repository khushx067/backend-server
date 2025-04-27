const ConnectDB = require("../DB/t_db_connect");

async function AddClass(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Classes");

    const { grade, image, description } = req.body;

    await collection.insertOne({
      grade,
      image,
      description,
      status: "Active",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Class Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddClass };
