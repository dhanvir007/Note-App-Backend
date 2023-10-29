const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = (await mongoose.connect(process.env.MONGOOSE_URL))
        console.log(`Database server is Started :- `, connect.connection.name);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;