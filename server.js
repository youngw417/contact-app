const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();


// connect database
connectDB();

// app.get('/', (req, res) => 
//     res.json({msg: 'Welcome to the ContactKeeper API'})
// );

// init Middleware
app.use(express.json({extended: false}));


// define routes

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/bulid'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));