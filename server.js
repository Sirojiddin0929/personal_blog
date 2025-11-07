import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';


dotenv.config();
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


app.use('/auth', authRoutes);
app.use('/posts', postRoutes);


app.get('/', (req, res) => {
res.redirect('/posts');
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
app.listen(3000, () => console.log('Server running on port 3000'));
})
.catch(err => console.error(err));