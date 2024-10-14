const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const router = require("./routers/route");
const branchRoutes = require("./routers/BranchRoutes");
const protect = require("./middleware/Authtoken");
const userRoutes = require("./routers/UserRoutes");
const acdemicRoutes = require("./routers/AcademicRoutes");
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use("/api/branch", protect.authMiddleware, branchRoutes);
app.use("/api/branch", protect.authMiddleware, userRoutes);
app.use("/api/academic", protect.authMiddleware, acdemicRoutes);

database().then(
  app.listen(process.env.PORT, () => {
    console.log("server is running");
  })
);

// const token = localStorage.getItem('token');
// if (token) {
//   const response = await fetch('YOUR_API_ENDPOINT', {
//     method: 'GET', // or POST, PUT, DELETE, etc.
//     headers: {
//       'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ /* your request payload */ }),
//   });

//   const data = await response.json();
//   console.log(data);
// }
