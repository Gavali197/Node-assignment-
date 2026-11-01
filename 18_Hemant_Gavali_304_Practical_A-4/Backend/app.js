const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const Admin = require('./models/Admin');
const Computer = require('./models/Computer');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'shopSecretKey',
    resave: false,
    saveUninitialized: true
}));


mongoose.connect('mongodb://127.0.0.1:27017/computer_shop_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));


const auth = (req, res, next) => {
    if (req.session.adminId) return next();
    res.redirect('/login');
};


app.get('/register', (req, res) => res.render('register', { error: null }));

app.post('/register', async (req, res) => {
    const { adminName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.render('register', { error: 'Passwords do not match!' });
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ adminName, email, password: hashedPassword });
        await newAdmin.save();
        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: 'Email already exists or error occurred.' });
    }
});

app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && await bcrypt.compare(password, admin.password)) {
        req.session.adminId = admin._id;
        res.redirect('/');
    } else {
        res.render('login', { error: 'Invalid Email or Password' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/', auth, (req, res) => res.render('home'));

app.get('/computer/add', auth, async (req, res) => {
    try {
        // Calling the PHP API from Section 2
        const response = await axios.get('http://localhost/brands_api.php');
        res.render('computer-form', { brands: response.data });
    } catch (error) {
        res.send("Error fetching brands from PHP API. Ensure XAMPP/Apache is running.");
    }
});

app.post('/computer/add', auth, async (req, res) => {
    try {
        const newComp = new Computer(req.body);
        await newComp.save();
        res.redirect('/computer/list');
    } catch (err) {
        res.send("Error saving computer data: " + err.message);
    }
});

app.get('/computer/list', auth, async (req, res) => {
    const filter = req.query.type ? { computerType: req.query.type } : {};
    const computers = await Computer.find(filter);
    res.render('computer-list', { computers, currentFilter: req.query.type || 'All' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));