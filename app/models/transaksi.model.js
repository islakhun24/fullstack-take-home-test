
const mongoose = require('mongoose');

const TransaksiSchema = mongoose.Schema({
    _id: { type: String },
    date: Date,
    total_price:Number,
    id_event:{type:String, ref:'Event'},
    ticket:[
        {id_type_ticket:{type:String, ref:'Ticket'}, person_order:Array}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransaksiSchema);