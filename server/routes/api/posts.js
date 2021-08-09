const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createAt: new Date(),
  });
  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  console.log(req.params);
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.status(201).send();
});

module.exports = router;
const loadPostsCollection = async () => {
  const client = MongoClient.connect(
    "mongodb+srv://Sergey:mongoDB;@cluster0.bylhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  return (await client).db("vue_express").collection("posts");
};
