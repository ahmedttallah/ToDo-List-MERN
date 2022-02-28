const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const router = require("./routes");

const app = express();

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Connected to db"))
    .catch((err) => console.log("Database ERROR : ", err));

// Apply middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Apply the routers
app.use("/todos", router);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on http://localhost:${port}`));