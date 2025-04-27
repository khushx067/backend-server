const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");

async function DeletePackage(req, res) {
  try {
    const { packageId } = req.body; // Get package ID from request parameters
    const db = await ConnectDB();
    const collection = db.collection("Packages");

    // Find and update the package status to 'Inactive'
    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(packageId) },
      { $set: { status: "Inactive" } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Package not found or already inactive" });
    }

    return res
      .status(200)
      .json({ message: "Package status updated to Inactive" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { DeletePackage };
