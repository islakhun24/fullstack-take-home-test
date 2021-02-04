const Transaksi = require('../models/transaksi.model')
const Ticket = require('../models/tiket.model')
const Event = require('../models/event.model')
const MUUID = require('uuid-mongodb');
exports.gets = (req,res)=>{
    Transaksi.find().then(async datass=>{
       const transc = datass.map(async data =>{
            console.log(data);
        const tickets = (data.ticket).map(async datas =>{
            const ticket = await Ticket.find({_id:datas.id_type_ticket}).exec()
            
            return ticket
        })
        // Ticket
         
        //Event 
       
            const events = await Event.findOne({_id:data.id_event}).exec()
        
        return {
            _id : data._id,
            date: data.date,
            total_price: data.total_price,
            event : events,
            tickets: await Promise.all(tickets),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
        })
        
        return res.status(200).send({
            success:true,
            data: await Promise.all(transc)
        })
        
    }).catch(err=>{
        return res.status(500).send(err)
    })
}

exports.create = async (req,res)=>{
    const {date,id_event, ticket} = req.body
    
   const mapFetch =ticket.map(async data=>{
        const ticketFetch = await Ticket.findById(data.id_type_ticket).then(datas=>{
           const count_person = (data.person_order).length
           
           if(count_person === 0){
            return {
                success:false,
                message: `Kuota ${datas.ticket_type} melebihi tidak boleh 0`
            }
           }
           if(count_person > datas.quota){
            return {
                success:false,
                message: `Kuota ${datas.ticket_type} melebihi batas`
            }
           }

           return {
               id_type_ticket: datas._id,
               price: datas.price,
               person_order: data.person_order
           }
        }).catch(err=>{
            return {
                success:false,
                message: err
            }
        })

        return await ticketFetch;
   })

   const result = await Promise.all(mapFetch);
  
   const total_price = result.reduce((a,b)=> a + b.price,0);
   const mUUID1 = MUUID.v1();
   const transaksi = new Transaksi({
    _id:mUUID1.toString(),
    date: date,
    total_price:total_price,
    id_event:id_event,
    ticket:result})

    transaksi.save().then(data=>{
        return res.status(200).send({
            success:true,
            message: "success purchase event",
            data: data
        })
    }).catch(err=>{
        return res.status(500).send({
            success:false,
            message: err
        })
    })
}