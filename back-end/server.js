const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// connect to database
mongoose.connect('mongodb://localhost:27017/cp4', {
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
	fat: Number,
	items: Array
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

// users
app.get('/api/users', async (req, res) => {
	try {
		let users = await User.find();
		res.send(users);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.get('/api/users/:username', async (req, res) => {
	try {
		let user = await User.findOne({username: req.params.username});
		res.send(user);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.get('/api/users/:username/:password', async (req, res) => {
	try {
		let user = await User.findOne({username: req.params.username, password: req.params.password});
		res.send(user);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.get('/api/userbyid/:uid', async (req, res) => {
	try {
		let r = await User.findOne({_id: req.params.uid});
		res.send(r);
	} catch (e) {
		console.log(e);
	}
});
app.post('/api/users', async (req, res) => {
	try {
		const user = new User({
			username: req.body.username,
			password: req.body.password
		});
		let r = await user.save();

		// immediately create set of goals for person
		const goals = new Goals({
			userID: r._id
		});
		await goals.save();
		res.send(user);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
})

// items
app.get('/api/items/:uid', async (req, res) => {
	try {
		let items = await Item.find({userID: req.params.uid});
		res.send(items);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.post('/api/items/:uid', async (req, res) => {
	try {
		let item = new Item({
			name: req.body.name,
			cals: req.body.cals,
			prot: req.body.prot,
			carbs: req.body.carbs,
			fat: req.body.fat,
			userID: req.params.uid
		});
		let r = await item.save();
		res.send(r);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.put('/api/items/:id', async (req, res) => {
	try {
		let item = await Item.findOne({_id: req.params.id});
		item.name = req.body.name;
		item.cals = req.body.cals;
		item.prot = req.body.prot;
		item.carbs = req.body.carbs;
		item.fat = req.body.fat;
		item.save();
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
})
app.delete('/api/items/:id', async (req, res) => {
	try {
		let r = await Item.deleteOne({_id: req.params.id});
		res.send(r);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
})

// goals
app.get('/api/goals/:uid', async (req, res) => {
	try {
		let goals = await Goals.findOne({userID: req.params.uid});
		res.send(goals);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.post('/api/goals/:uid', async (req, res) => {
	try {
		let goals = new Goals({
			userID: req.params.uid
		});
		let r = await goals.save();
		res.send(r);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.put('/api/goals/:uid', async (req, res) => {
	try {
		let goals = await Goals.findOne({userID: req.params.uid});
		goals.cals = req.body.cals;
		goals.prot = req.body.prot;
		goals.carbs = req.body.carbs;
		goals.fat = req.body.fat;
		goals.save();
		res.sendStatus(200);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
})

// days
app.get('/api/days/:uid', async (req, res) => {
	try {
		let days = await Day.find({userID: req.params.uid});
		res.send(days);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.get('/api/today/:date/:uid', async (req, res) => {
	try {
		let day = await Day.findOne({date: req.params.date, userID: req.params.uid});
		if (day) {
			let items = await Item.find({userID: req.params.uid});
			if (items && day.items) {
				day.items = day.items.map(id => {
					return items.find(i => {return i._id == id});
				})
			}
			else
				day.items = [];
		}

		res.send(day);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.delete('/api/days/:date/:uid', async (req, res) => {
	try {
		let r = await Day.deleteOne({date: req.params.date, userID: req.params.uid});
		res.send(r);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.post('/api/days/:uid', async (req, res) => {
	try {
		let day = new Day({
			date: req.body.date,
			cals: req.body.cals,
			prot: req.body.prot,
			carbs: req.body.carbs,
			fat: req.body.fat,
			userID: req.params.uid,
			items: req.body.items
		});
		let r = await day.save();
		res.send(r);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
});
app.put('/api/days/:date/:uid', async (req, res) => {
	try {
		let day = await Day.findOne({date: req.params.date, userID: req.params.uid});
		if (!day) res.sendStatus(500);

		day.cals = req.body.cals;
		day.prot = req.body.prot;
		day.carbs = req.body.carbs;
		day.fat = req.body.fat;
		day.items = req.body.items;
		let r = await day.save();
		res.send(r);
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
})

app.listen(3000, () => console.log('Server listening on port 3000...'));
