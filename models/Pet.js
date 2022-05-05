var mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    petName: {
        type: String
    },
    adoptable: {
        type: Boolean,
        default: false
    },
    category: {
        type: String
    },
    breed: {
        type: String
    },
    species: {
        type: String
    },
    age: {
        type: String 
    },
    size: {
        type: String
    },
    hypo: {
        type: Boolean,
        default: false
    },
    sex:{
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    comment: {
        type: String
    },
    path: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Pets = mongoose.model('pet', PetSchema);