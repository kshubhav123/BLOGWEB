const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs")
require("dotenv").config();
const app = express();
const cookieParser=require("cookie-parser")

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(() => console.log("DB CONNECTED")).catch((er) => console.log("error =>", er))
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors())
app.use(cookieParser());

// routes 
fs.readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+ r)));

//connction
const port = process.env.SERVER_PORT || 8000;
app.listen({ port }, () => console.log(`Server run on the ${port}`));