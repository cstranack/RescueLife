var mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    petName: {
        type: String
    },
    // adoptable: {
    //     type: Boolean,
    // },
    // category: {
    //     type: String, possibleValues: ['Dog','Cat','Equine','Other']
    // },
    breed: {
        type: String
    },
    species: {
        type: String
    },
    age: {
        type: Number
    },
    // size: {
    //     type: String
    // },
    // hypo: {
    //     type: Boolean,
    //     // default: False
    // },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Pets = mongoose.model('pet', PetSchema);