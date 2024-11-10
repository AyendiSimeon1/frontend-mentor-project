const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
    const uri = process.env.MONGODB_URI;
    console.log(uri);
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    try {
        const connection = await mongoose.connect(uri, options);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.log('Error connectiong to MongoDB', error);
        throw error;
    };
   
};


module.exports = {
    connectDatabase,
    getConnection: () => mongoose.connection
}
