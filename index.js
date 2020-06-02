// const express = require("express");4
import express from ('express')
const cors = require("cors");
const port = 3001;
const app = express();
// const db = require("./app/models");

// app.use(cors(corsOptions));
app.use(express.json());

// // user routes
// require("./app/routes/userRoutes")(app);

// // project routes
// require("./app/routes/projectRoutes")(app);

// // task routes
// require("./app/routes/taskRoutes")(app);

// default route
// app.get("/*", (req, res) => {
//   res.json({
//     message: "route not in used, please go to /api/[users,tasks,projects]",
//   });
// });

// set port, listen for requests
// const PORT = process.env.PORT || port;
app.listen(3000,()=>{
  console.log(`server is runnign`)
})
// db.sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on localhost:${PORT}.`);
//   });
// });
