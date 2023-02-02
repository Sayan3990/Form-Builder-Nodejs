require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.set('strictQuery', false);

mongoose.connect(
  process.env.DB_URL,
  {
    // useNewUrlParser: true,
    // useCreateIndex: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Mongdb is connected");
  }
);

app.use(express.json());

const formSchema = new mongoose.Schema({
  questions: [
    {
      // _id: Schema.ObjectId,
      text: String,
    },
  ],
});

const Form = mongoose.model("form", formSchema);

app.get("/", async (req, res) => {
  const form = new Form({
    questions: [
      {
        text: "Question1",
      },
      {
        text: "Question2",
      },
    ],
  });

  console.log("Hello ____________________________________");

  const data = await form.save();

  res.send(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
