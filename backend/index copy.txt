// Code for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://martincosdi:EqswFeO1v9ZTLvpe@cluster0.hldrpzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
	dbName: 'RequisitionDB',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) : 
	console.log('Connected to yourDB-name database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	vendor: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		default: 'LAX',
	},
	date: {
		type: Date,
		default: Date.now,
	},
	expected_date: {
		type: Date,
		default: null,
	},
    partList: {
        type: Object
    }
});
const User = mongoose.model('requisition', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(5000);
