const express = require("express");
const app = express();
const Joi = require("joi");
const pino = require("pino-http");

app.use(express.json());
app.use(pino())

const schema = Joi.object({
  title : Joi.string().min(5).required(),
  content : Joi.string().min(10).max(59).required,
  date : Joi.date(),
  tags : Joi.arry().items(Joi.string())
}) 

const posts = [
  {
    id: 1,
    title: "express tutotial",
    content: "lorem ipsum",
    date: new Date("2020-04-23"),
    tags: ["tag1", "tag2"],
  },
];



app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
  // validations
  const { error, value }  = schema.validate(req.body);
  if (error?.details.length){
    return res.status(400).json(error.details);
  }
  

  // add to database
  posts.push(req.body);

  // response
  res.status(201).json(posts[posts.length - 1]);
});

app.listen(3000, () => {
  console.log("server is running (express)");
});
