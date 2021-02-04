
const mongoose = require('mongoose')

const MUUID = require('uuid-mongodb');
const mUUID1 = MUUID.v1();

const TiketSchema = mongoose.Schema({
    _id:{ type: String, default: mUUID1.toString() },
    quota: Number,
    ticket_type:String,
    price:Number,
    event_id: {type:String, ref:'Event'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', TiketSchema);