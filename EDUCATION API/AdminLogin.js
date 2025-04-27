const ConnectMongoDB = require("../DB/t_db_connect");

async function EducationAdminLogin(req, res) {
  try {
    const db = await ConnectMongoDB();

    const collection = db.collection("admin");

    const { email, password } = req.body;
    const user = await collection.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    res.status(200).json({
      user,
      success: true,
      message: "EducationAdminLogin Successful",
    });
  } catch (error) {
    console.log("EducationAdminlogin.js: ", error);
    res
      .status(500)
      .json({ success: false, message: "EducationAdminLogin Failed" });
  }
}

module.exports = { EducationAdminLogin };
