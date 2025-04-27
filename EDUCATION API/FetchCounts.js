const ConnectDB = require("../DB/t_db_connect");

async function FetchDashboardCounts(req, res) {
  try {
    const db = await ConnectDB();

    const teacherCollection = db.collection("Teachers");
    const subjectCollection = db.collection("Subjects");
    const classCollection = db.collection("Classes");

    const totalTeachers = await teacherCollection.countDocuments({ status: "Active" });
    const totalSubjects = await subjectCollection.countDocuments({ status: "Active" });
    const totalClasses = await classCollection.countDocuments({ status: "Active" });

    return res.status(200).json({
      message: "Counts Fetched",
      counts: {
        totalTeachers,
        totalSubjects,
        totalClasses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchDashboardCounts };
