const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000;

//Connect to database
connectDB()

const app = express();
app.use(express.json()); //da možemo prihaćati jsone
app.use(express.urlencoded({ extended: false })); //da možemo prihvaćati encodirane podatke

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support desk API' });
});

//koristimo /api/users/ i na to concatinateamo rutu iz userRoutes,
//npr /api/users/login, a u userRoutes imamo samo /login
app.use('/api/users', require('./routes/userRoutes'));

//za handleanje errora
app.use(errorHandler);

//Pokretanje servera
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
