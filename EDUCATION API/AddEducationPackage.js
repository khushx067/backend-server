const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");
const moment = require("moment");

async function AddEducationPackage(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Packages");

    const {
      packageName,
      classId,
      subjects,
      teachers,
      description,
      maxStudent,
      price,
      discount,
      image,
      startDate,
      endDate,
      liveClasses,
      recordedClasses,
      learningMaterials,
      communityAccess,
      subscriptionType,
      languages,
    } = req.body;

    // Calculate final price based on discount
    const finalPrice = price - (price * discount) / 100;

    // Calculate duration
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = end.diff(start, "days");

    let durationString = "";
    if (duration < 30) {
      durationString = `${duration} days`;
    } else if (duration < 365) {
      const months = end.diff(start, "months");
      const remainingDays = duration % 30;
      durationString = remainingDays
        ? `${months} months ${remainingDays} days`
        : `${months} months`;
    } else {
      const years = end.diff(start, "years");
      const remainingMonths = end.diff(start.add(years, "years"), "months");
      durationString = remainingMonths
        ? `${years} years ${remainingMonths} months`
        : `${years} years`;
    }

    // Fetch class details
    const collectionClass = db.collection("Classes");
    const classDetails = await collectionClass.findOne({
      _id: ObjectId.createFromHexString(classId),
    });

    // Fetch teachers
    const collectionTeachers = db.collection("Teachers");
    const teacherObjects = await collectionTeachers
      .find({
        _id: {
          $in: teachers.map((teacherId) =>
            ObjectId.createFromHexString(teacherId)
          ),
        },
      })
      .toArray();

    // Insert data into the Packages collection
    await collection.insertOne({
      packageName,
      classDetails,
      subjects,
      teachers: teacherObjects,
      description,
      maxStudent,
      price,
      discount,
      finalPrice,
      currency: "INR",
      image,
      duration: durationString,
      startDate,
      endDate,
      liveClasses,
      recordedClasses,
      learningMaterials,
      communityAccess,
      subscriptionType,
      status: "Active",
      languages,
    });

    return res.status(200).json({ message: "Package Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddEducationPackage };
