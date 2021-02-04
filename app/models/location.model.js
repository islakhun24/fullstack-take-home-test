
const mongoose = require('mongoose');
const LocationSchema = mongoose.Schema({
    _id: { type: String },
    location: {type:String, unique:true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);