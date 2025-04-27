const { ObjectId } = require("mongodb");
const ConnectDB = require("../DB/t_db_connect");
const moment = require("moment");

async function EditEducationPackage(req, res) {
  try {
    const db = await ConnectDB();
    const collection = db.collection("Packages");

    const {
      packageId,
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
      status, // Optional
    } = req.body;

    if (!packageId) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    // Fetch existing package details
    const existingPackage = await collection.findOne({
      _id: ObjectId.createFromHexString(packageId),
    });

    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Use existing values if new ones are not provided
    const updatedData = {
      packageName: packageName || existingPackage.packageName,
      subjects: subjects || existingPackage.subjects,
      description: description || existingPackage.description,
      maxStudent:
        maxStudent !== undefined ? maxStudent : existingPackage.maxStudent,
      price: price !== undefined ? price : existingPackage.price,
      discount: discount !== undefined ? discount : existingPackage.discount,
      image: image || existingPackage.image,
      startDate: startDate || existingPackage.startDate,
      endDate: endDate || existingPackage.endDate,
      liveClasses:
        liveClasses !== undefined ? liveClasses : existingPackage.liveClasses,
      recordedClasses:
        recordedClasses !== undefined
          ? recordedClasses
          : existingPackage.recordedClasses,
      learningMaterials:
        learningMaterials !== undefined
          ? learningMaterials
          : existingPackage.learningMaterials,
      communityAccess:
        communityAccess !== undefined
          ? communityAccess
          : existingPackage.communityAccess,
      subscriptionType: subscriptionType || existingPackage.subscriptionType,
      languages: languages || existingPackage.languages,
      status: status || existingPackage.status,
      currency: "INR",
    };

    // Recalculate final price if price or discount is updated
    updatedData.finalPrice =
      updatedData.price - (updatedData.price * updatedData.discount) / 100;

    // Recalculate duration if startDate or endDate is updated
    if (startDate || endDate) {
      const start = moment(updatedData.startDate);
      const end = moment(updatedData.endDate);
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
      updatedData.duration = durationString;
    } else {
      updatedData.duration = existingPackage.duration;
    }

    // Fetch class details only if classId is provided
    if (classId) {
      const collectionClass = db.collection("Classes");
      updatedData.classDetails = await collectionClass.findOne({
        _id: ObjectId.createFromHexString(classId),
      });
    } else {
      updatedData.classDetails = existingPackage.classDetails;
    }

    // Fetch teachers only if teachers are provided
    if (teachers) {
      const collectionTeachers = db.collection("Teachers");
      updatedData.teachers = await collectionTeachers
        .find({
          _id: {
            $in: teachers.map((teacherId) =>
              ObjectId.createFromHexString(teacherId)
            ),
          },
        })
        .toArray();
    } else {
      updatedData.teachers = existingPackage.teachers;
    }

    // Update the package
    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(packageId) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "No changes made to the package." });
    }

    return res.status(200).json({ message: "Package Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { EditEducationPackage };
