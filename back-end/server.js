const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/cp4', {
	useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
	userID: String,
	username: String,
	password: String
});

const itemSchema = new mongoose.Schema({
	userID: String,
	name: String,
	cals: Number,
	prot: Number,
	carbs: Number,
	fat: Number
});

const daySchema = new mongoose.Schema({
	userID: String,
	date: String,
	cals: Number,
	prot: Number,
	carbs: Number,
	fat: Number
});

const goalsSchema = new mongoose.Schema({
	userID: String,
	cals: Number,
	prot: Number,
	carbs: Number,
	fat: Number
});

const User = mongoose.model('users', userSchema);
const Item = mongoose.model('items', itemSchema);
const Day = mongoose.model('days', daySchema);
const Goals = mongoose.model('goals', goalsSchema);

app.get('/api', async (req, res) => {
	try {
		res.send('hello man');
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

app.get('/api/items', async (req, res) => {
	try {
		//res.send("hello");
		//let items = await Item.find();
		//res.send(items);
		let items = await Day.find();
		res.send(items);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

app.listen(3000, () => console.log('Server listening on port 3000...'));
