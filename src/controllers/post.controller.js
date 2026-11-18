import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

export async function createPost(req, res) {
  const { title, content } = req.body ?? {};
  const post = await Post.create({ title, content });

  return res.status(201).json(post);
}

export async function getPosts(req, res) {
  const posts = await Post.find();

  return res.json(posts);
}

export async function getPost(req, res) {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.json(post);
}

export async function updatePost(req, res) {
  const { title, content } = req.body ?? {};
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Send a title or content to update" });
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { returnDocument: "after", runValidators: true },
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.json(post);
}

export async function deletePost(req, res) {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.json({ message: "Post deleted", id: post.id });
}

export function validatePostId(req, res, next) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  next();
}