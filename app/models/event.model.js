
const mongoose = require('mongoose');

const m = require('mongodb')
const u = require('mongo-uuid')
 
const uuid = i => u(m.Binary, i)
const id = uuid()
const EventSchema = mongoose.Schema({
    _id:{ type: String, default: u.stringify(id) },
    location: {type: String, default: u.stringify(id) , required: true, ref: 'Location'},
    date_start: Date,
    date_end: Date,
    event_name:String,
    description:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);