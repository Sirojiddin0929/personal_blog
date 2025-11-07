import express from 'express';
import { protectRoute } from '../controllers/authController.js';
import { getAllPosts, getCreatePage, createPost, getEditPage, updatePost, deletePost } from '../controllers/postController.js';


const router = express.Router();


router.get('/', getAllPosts);
router.get('/create', protectRoute, getCreatePage);
router.post('/create', protectRoute, createPost);
router.get('/edit/:id', protectRoute, getEditPage);
router.post('/edit/:id', protectRoute, updatePost);
router.get('/delete/:id', protectRoute, deletePost);


export default router;