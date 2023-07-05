const mongoose = require("mongoose");
require('dotenv').config({
    path: '.env'
});

const connectDB = async () => {
    try {
      await  mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    const url = `${mongoose.connection.host}:${mongoose.connection.port}`

    console.log(`MongoDB conectado en: ${url}`)

    }
        
     catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;