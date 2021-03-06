const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/*BEFORE doing this I kept getting an error code: 'DEPTH_ZERO_SELF_SIGNED_CERT'*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL, 
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

/*const database = {
	users: [
		{
			id: '123',
			name: 'john',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}*/

app.get('/', (req, res) => {
	res.send('it is working!');
})

/*SIGN IN*/
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

/*REGISTER*/
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

/*PROFILE*/
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

/*IMAGE -> every time an image is submitted we want to increase the entries */
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
/ i want to have a route which responses with this is working
/ signin route

*/