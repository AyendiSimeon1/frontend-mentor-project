const mongoose = require('mongoose');


const connectDatabase = async () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, options);
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
