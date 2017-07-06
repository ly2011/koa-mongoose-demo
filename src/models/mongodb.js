import mongoose from 'mongoose'
mongoose.Promise = Promise

// connect mongodb
const mongodb_url = 'mongodb://localhost:27017/blog'
mongoose.connect(mongodb_url, (err) => {
    if (err) throw err;
})
mongoose.connection.on('error', console.error)
