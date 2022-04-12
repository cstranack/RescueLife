var mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: String,
    description: String,
    path: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('Image', ImageSchema);