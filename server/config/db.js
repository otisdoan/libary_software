const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin',
        });
        
        console.log('=================================');
        console.log('🎉 MongoDB connection successful!');
        console.log(`📡 MongoDB Host: ${conn.connection.host}`);
        console.log(`🗄️ Database Name: ${conn.connection.name}`);
        console.log('=================================');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;