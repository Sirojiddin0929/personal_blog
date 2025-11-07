import { Post } from '../models/post.model.js';


export const getAllPosts = async (req, res) => {
const posts = await Post.find().sort({ createdAt: -1 });
res.render('posts', { posts });
};


export const getCreatePage = (req, res) => {
res.render('create');
};


export const createPost = async (req, res) => {
const { title, content } = req.body;
await Post.create({ title, content });
res.redirect('/posts');
};


export const getEditPage = async (req, res) => {
const post = await Post.findById(req.params.id);
res.render('edit', { post });
};


export const updatePost = async (req, res) => {
const { title, content } = req.body;
await Post.findByIdAndUpdate(req.params.id, { title, content });
res.redirect('/posts');
};


export const deletePost = async (req, res) => {
await Post.findByIdAndDelete(req.params.id);
res.redirect('/posts');
};