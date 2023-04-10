const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose is disconnected due to application termination');
        process.exit(0);
    });
});


module.exports = mongoose