const router = require("express").Router();
const quiz = require("../models/quiz");
const result = require("../models/result");
const axios = require("axios");
const verify = require("./verifyToken");

router.route("/").post(async (req, res) => {
  const quizId = req.body.pin;
  const email = req.body.email.toLowerCase();
  const doc = await quiz.findOne({ pin: quizId }).exec();
  if (!doc) {
    return res.status(400).send({ message: "Quiz doesn't exist!" });
  }
  if (Date.parse(doc.expiry) < Date.now()) {
    return res.status(400).send({ message: "Quiz has expired!! " });
  }
  const check = await result.findOne({ pin: quizId, email }).exec();
  if (check) {
    return res.status(400).send({ message: "Quiz already taken!" });
  }
  const questions = await axios.get("https://opentdb.com/api.php", {
    params: {
      amount: 10,
      category: doc.topic,
    },
  });
  if (questions.data.response_code == 0) return res.send(questions.data);
  else
    return res
      .status(400)
      .send({ message: "Couldn't fetch quiz details. Try again!" });
});

if(questions.data.pin < 1 || questions.data.pin > 10) {
    router.route("/submitquiz").post(async (req, res) => {
    const score = parseInt(req.body.score);
    const email = req.body.email.toLowerCase();
    const name = req.body.name;
    const pin = req.body.pin;

    const resultEntry = new result({ email, name, pin, score });
    resultEntry
        .save()
        .then(() => res.send("result added!"))
        .catch((err) => res.status(400).json("error : " + err));
    });
}

router.use("/getquiz", verify);
router.use("/getresults", verify);
router.use("/addquiz", verify);

router.route("/getquiz").post(async (req, res) => {
  const email = req.user.email;
  try {
    const doc = await quiz.find({ email }).sort("-created").exec();
    return res.send(doc);
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});

router.route("/getresults").post(async (req, res) => {
  const pin = req.body.pin;
  try {
    const resultdoc = await result.find({ pin }).exec();
    return res.send(resultdoc);
  } catch (err) {
    return res.status(400).send();
  }
});

router.route("/addquiz").post(async (req, res) => {
  const pin = (await quiz.countDocuments({}).exec()) + 1000;
  const email = req.user.email.toLowerCase();
  const topic = req.body.topic;
  const expiry = Date.parse(req.body.expiry);
  const created = Date.parse(req.body.created);

  const newQuiz = new quiz({
    pin,
    email,
    topic,
    expiry,
    created,
  });
  newQuiz
    .save()
    .then(() => res.send("quiz added!"))
    .catch((err) => res.status(400).json("error : " + err));
});

module.exports = router;