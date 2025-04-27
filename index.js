const express = require("express");
const cors = require("cors");
require("dotenv").config();

// EDUCATION
const { AddTeacher } = require("./EDUCATION API/AddEducationTeacher");
const { AddSubject } = require("./EDUCATION API/AddEducationSubject");
const { AddClass } = require("./EDUCATION API/AddEducationClasses");
const { AddEducationPackage } = require("./EDUCATION API/AddEducationPackage");
const { AddEducationContact } = require("./EDUCATION API/AddEducationContact");
const { AddEducationInquiry } = require("./EDUCATION API/AddEducationInq");
const {
  FetchEducationClasses,
} = require("./EDUCATION API/FetchEducationClasses");
const {
  FetchEducationTeachers,
} = require("./EDUCATION API/FetchEducationTeachers");
const {
  FetchEducationPackages,
} = require("./EDUCATION API/FetchEducationPackages");
const {
  FetchEducationSubjects,
} = require("./EDUCATION API/FetchEducationSucjects");

const {
  FetchEducationPackagesByGrade,
} = require("./EDUCATION API/FetchEducationPackagesByGrade");
const {
  FetchEducationPackageDetails,
} = require("./EDUCATION API/FetchEducationPackageDetails");
const {
  FetchEducationTeacherDetails,
} = require("./EDUCATION API/FetchEducationTeacherDetails");
const { EducationAdminLogin } = require("./EDUCATION API/AdminLogin");
const { EditClass } = require("./EDUCATION API/EditEducationClasses");
const { DeleteClass } = require("./EDUCATION API/DeleteEducationClasses");
const { EditSubject } = require("./EDUCATION API/EditEducationSubject");
const { DeleteSubject } = require("./EDUCATION API/DeleteEducationSubject");
const { EditTeacher } = require("./EDUCATION API/EditEducationTeacher");
const { DeleteTeacher } = require("./EDUCATION API/DeleteEducationTeacher");
const {
  EditEducationPackage,
} = require("./EDUCATION API/EditEducationPackage");
const { DeletePackage } = require("./EDUCATION API/DeleteEducationPackage");
const { FetchEducationContact } = require("./EDUCATION API/FetchContact");
const { FetchEducationInquiry } = require("./EDUCATION API/FetchInquiry");
const { FetchDashboardCounts } = require("./EDUCATION API/FetchCounts");



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ], // Allowed frontend URLs
    credentials: true, // Allow cookies and sessions to be shared across origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

const port = process.env.PORT || 8100;

// Fetch Api
app.post("/admin/login", EducationAdminLogin);
app.get("/classes", FetchEducationClasses);
app.get("/teachers", FetchEducationTeachers);
app.get("/packages", FetchEducationPackages);
app.get("/subjects", FetchEducationSubjects);
app.get("/classes/packages/:classId", FetchEducationPackagesByGrade);
app.get("/packages/:packageId", FetchEducationPackageDetails);
app.get("/teachers/:teacherId", FetchEducationTeacherDetails);
app.get("/getContact", FetchEducationContact);
app.get("/getInquiries", FetchEducationInquiry);
app.get("/getCounts", FetchDashboardCounts);

// Insert API
app.post("/addteacher", AddTeacher);
app.post("/addsubject", AddSubject);
app.post("/addclasses", AddClass);
app.post("/addPackageeducation", AddEducationPackage);
app.post("/addeducationcontact", AddEducationContact);
app.post("/addeducationinq", AddEducationInquiry);

//Edit API
app.post("/editClass", EditClass);
app.post("/editSubject", EditSubject);
app.post("/editTeacher", EditTeacher);
app.post("/editEducationPackage", EditEducationPackage);

//Delete API
app.post("/deleteClass", DeleteClass);
app.post("/deleteSubject", DeleteSubject);
app.post("/deleteTeacher", DeleteTeacher);
app.post("/deletePackage", DeletePackage);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
