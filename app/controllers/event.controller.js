const Event = require('../models/event.model')
const Ticket = require('../models/tiket.model')
const MUUID = require('uuid-mongodb');
exports.create = (req,res)=>{
    const {
        location,
        date_start,
        date_end,
        event_name,
        description
    } = req.body

    if(!location){
        return res.status(400).send({
            success:false,
            message:"Field location tidak boleh kosong"
        })
    }
    if(!date_start){
        return res.status(400).send({
            success:false,
            message:"Field date_start tidak boleh kosong"
        })
    }
    if(!date_end){
        return res.status(400).send({
            success:false,
            message:"Field date_end tidak boleh kosong"
        })
    }
    if(!event_name){
        return res.status(400).send({
            success:false,
            message:"Field event_name tidak boleh kosong"
        })
    }
    if(!description){
        return res.status(400).send({
            success:false,
            message:"Field description tidak boleh kosong"
        })
    }

    const mUUID1 = MUUID.v1();
    const events = new Event({
        _id: mUUID1.toString(),
        location : location,
        date_start : date_start,
        date_end : date_end,
        event_name : event_name,
        description : description
    })
    events.save().then(data=>{
        return res.status(200).send({
            success:true,
            message: "success create event",
            data: data
        })
    }).catch(err=>{
        return res.status(500).send({
            success:false,
            message: err
        })
    })
}

exports.get = (req,res) =>{
    pipeline = [
        {
          $lookup:  {
            from: 'locations',
            localField: 'location',
            foreignField: '_id',
            as: 'location'
          }
        },
        
          {
            $project: {
                _id:true,
                date_start: 1,
                date_end: 1,
                event_name: 1,
                description: 1,
                createdAt: 1,
                updatedAt: 1, 
                location: {$arrayElemAt:["$location",0]}
            }
         }
    ]
    Event.aggregate(pipeline).then(async event=> {
        const evnt = event.map(async data=>{
            const id = data._id
            const ticket = await Ticket.find({event_id:id}).exec()
            return {
                _id:data._id,
                date_start: data.date_start,
                date_end: data.date_end,
                event_name: data.event_name,
                description: data.description,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt, 
                location: data.location,
                ticket : ticket 
            }
        })
        res.send(await Promise.all(evnt));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving event."
        });
    })
}