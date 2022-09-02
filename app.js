const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("./blogstest");

mongoose.connect("mongodb://localhost:27017/blogApp").then(() => {
  console.log("connected to monggo");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("./blog/home");
});

app.get("/signin", (req, res) => {
  res.render("./blog/signin");
});

app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.redirect("/blogs");
});

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("./blog/blogs", { blogs });
});

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("./blog/blogDetail", { blog });
});

app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id);
  res.redirect("./blogs/blog");
});

app.get("/create", (req, res) => {
  res.render("./blog/addBlog");
});
app.listen(3000, () => {
  console.log("Serving on 3000");
});
