import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from "../config/db.js"
import cookieParser from "cookie-parser"
import { protect } from '../middleware/protect.js'

const router = express.Router();

//Cookie options for security
const cookieOptions = {
	httpOnly: true, //Makes cookies not accessible by JavaScript on client-side
	secure: process.env.NODE_ENV === 'production', //sends cookies over https
	sameSite: 'Strict', // prevents CSRF attacks
	maxAge: 30 * 24 * 60 * 60 * 1000 //Cookies will expire after 30 days.
}

//generating jwt tokens 
const generateToken = (user_id) => {
	//Creating user session
	return jwt.sign({user_id}, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
}

//Register
router.post('/register', async (req, res) => {
	const {username, email, password} = req.body; //destructuring properties
	
	if(!username || !email || !password){
		return res.status(400).json({ message: "Provide required fields" });
	} // checking if user forgots to provide data
	
	const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]); //variable to check if user already exists.
	
	if(userExists.rows.length > 0) {
		return res.status(400).json({ message: "User already exists" })
	} // action if user already exists

	//Hashing password
	const hashedPassword = await bcrypt.hash(password, 10);//10 salt rounds
	
	//Creating user
	const newUser = await pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email', [username, email, hashedPassword]);
	
	const token = generateToken(newUser.rows[0].user_id); //generating JWT token
	
	res.cookie('token', token, cookieOptions); //storing token in cookies
	
	return res.status(201).json({user: newUser.rows[0]});
})

// Login
router.post('/login', async(req, res) => {
	const { email, password } = req.body; //destructuring properties
	
	if (!email || !password) { //Checking if properties are empty
		return res.status(400).json({message: "Provide required fields"})
	}
	
	const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]); //Initializing user
	
	if(user.rows.length === 0){ //Checking if user exists
		return res.status(400).json({message: "Invalid credentials"});
	}
	
	const userData = user.rows[0]; //Making to acces properties easier 
	
	//Checking if saved password is equal to the password submitted
	const passwordMatch = await bcrypt.compare(password, userData.password)
	
	if (!passwordMatch) { //Acting if password doesn't match
		return res.status(400).json({message: "Incorrect Password"});
	}
	
	const token = generateToken(userData.user_id); //generating token
	
	res.cookie('token', token, cookieOptions); //generating cookies
	
	res.json({ //Returning user and its properties
		user: { 
			user_id: userData.user_id, 
			username: userData.username, 
			email: userData.email 
		}
	});
})

//Me page (page to show user's information)
//This is private info, so, WE'LL CREATE A MIDDLEWARE TO PROTECT THIS LATER.
router.get('/me', protect, async (req, res) => {
	res.json(req.user);
	// Will return info of logged in user from middleware/
})

router.post('/logout', (req,res) => {
	// clearing token and eliminating cookie, which logs out user.
	res.cookie('token', '', {...cookieOptions, maxAge: 1}); 
	res.json({message: "Logged out successfully."});
})

export default router