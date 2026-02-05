// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// "Middleware" that allows express to read
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Create a temp array to store orders
const orders = [];

// Define a default "route" ('/')
// req: contatins inforamtion about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Contact route
app.get('/contact', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

// Confirmation route
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
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
    res.send(order);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
