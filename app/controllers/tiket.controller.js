const Tiket = require('../models/tiket.model')
const MUUID = require('uuid-mongodb');
exports.create = (req,res)=>{
    const {quota, type, price, event_id} = req.body
    if(!quota){
        return res.status(400).send({
            success:false,
            message:"Field quota tidak boleh kosong"
        })
    }
    if(!type){
        return res.status(400).send({
            success:false,
            message:"Field type tidak boleh kosong"
        })
    }
    if(!event_id){
        return res.status(400).send({
            success:false,
            message:"Field event_id tidak boleh kosong"
        })
    }
    if(!price || price == 0){
        return res.status(400).send({
            success:false,
            message:"Field price tidak boleh kosong"
        })
    }
    
    const mUUID1 = MUUID.v1();
    const tickets = new Tiket({
        _id:mUUID1.toString(),
        quota :quota,
        ticket_type :type,
        price :price,
        event_id:event_id
 })
 tickets.save().then(data=>{
    return res.status(200).send({
        success:true,
        message: "success create tickets",
        data: data
    })
}).catch(err=>{
    return res.status(500).send({
        success:false,
        message: err
    })
})
}