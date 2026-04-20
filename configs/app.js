require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const connectDB = require('./database');

// const userRoutes = require('../routes/userRoute');
const productRoute = require('../routes/productRoute');
const userRoute = require('../routes/userRoute');
const fakeStoreRoute = require('../routes/fakeStoreRoutes');

const app = express();

app.use(express.json());

connectDB();

// app.use('/api', userRoutes);
app.use('/api', productRoute);
app.use('/api', userRoute);
app.use('/api', fakeStoreRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
