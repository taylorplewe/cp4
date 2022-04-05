const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/cp4', {
	useNewUrlParser: true
});

app.get('/api/butt', async (req, res) => {
	try {
		res.send("butt");
	} catch (e) {
		console.log(e);
		res.send(500);
	}
});

app.listen(3000, () => console.log('Server listening on port 3000...'));
