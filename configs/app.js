require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const connectDB = require('./database');

// const userRoutes = require('../routes/userRoute');
const productRoute = require('../routes/productRoute');

const app = express();

app.use(express.json());

connectDB();

// app.use('/api', userRoutes);
app.use('/api', productRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
