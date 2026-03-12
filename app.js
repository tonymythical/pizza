// Import the express module
import express from 'express';
import mysql2 from 'mysql2';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

//Set EJS as the view engine
app.set('view engine', 'ejs');

// "Middleware" that allows express to read
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Create a temp array to store orders
const orders = [];

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: '209.38.128.251',
    user: 'admin',
    password: 'T9M87z68',
    database: 'pizza_db',
    port: 3306
}).promise();

// Database test route
app.get('/db-test', async (req, res) => {

    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch(err) {
        console.error('Database error: ', err);
    }
});

// Define a default "route" ('/')
// req: contatins inforamtion about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.render('home');
});

// Contact route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Confirmation route
app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});

// Admin route
app.get('/admin', (req, res) => {
    res.render('admin', { orders });
});

app.post('/submit-order', (req, res) => {

    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings ? req.body.toppings : "none",
        size: req.body.size,
        comments: req.body.comments,
        timestamp: new Date()
    };

    // Add order object to orders array 
    orders.push(order);

    res.render('confirmation', { order });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
