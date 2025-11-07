import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';


export const registerUser = async (req, res) => {
const { username, email, password } = req.body;
try {
const hashed = await bcrypt.hash(password, 10);
const user = new User({ username, email, password: hashed });
await user.save();
res.redirect('/auth/login');
} catch (err) {
res.status(500).send('Registration error');
}
};


export const loginUser = async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).send('User not found');


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).send('Invalid credentials');


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.cookie('token', token, { httpOnly: true });
res.redirect('/posts');
} catch (err) {
res.status(500).send('Login error');
}
};


export const logoutUser = (req, res) => {
res.clearCookie('token');
res.redirect('/auth/login');
};


export const protectRoute = (req, res, next) => {
const token = req.cookies.token;
if (!token) return res.redirect('/auth/login');
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch (err) {
res.redirect('/auth/login');
}
};