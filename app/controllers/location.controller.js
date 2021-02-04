const Location = require('../models/location.model')
const MUUID = require('uuid-mongodb');
exports.create = (req,res)=>{
    const {location} = req.body
    if(!location){
        return res.status(400).send({
            success:false,
            message:"Field location tidak boleh kosong"
        })
    }

    const mUUID1 = MUUID.v1();
    const locations = new Location({
        _id:mUUID1.toString(),
        location:location
    })

    locations.save().then(data=>{
        return res.status(200).send({
            success:true,
            message: "Berhasil tambah location"
        })
    }).catch(err=>{
        return res.status(500).send({
            success:false,
            message: err
        })
    })
}