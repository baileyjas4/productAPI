//DEPENDECIES 
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connection');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES- INDUCES
// Mount product routes
// All routes inside productRoutes will start with /api/products
app.use('/api/products', productRoutes);

//DATABASE CONNECTION 
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

//DATABASE CONNECTION error/succes
//Define callback function for various events

//INDEX


//NEW 

//D
//U
//CREATE 


//E
//S

//PORT
// Start listening for requests
