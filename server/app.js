const express = require('express');
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));
connectDB();

app.get('/', (req, res) => res.send('Quiz Application!'));

const port = process.env.PORT || 8082;
mongoose.connection.once("open", () => {
    console.log("connection established successfully");
  });

const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);

app.use(express.static("/client/build/index.html"));

  app.all("*", (req, res) => {
    res.sendFile(__dirname, "/client/build/index.html");
    console.log("dir:", __dirname);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));