const express = require('express');
const mongoose = require('mongoose');
const enquiryModel = require('./enquire.model');
require('dotenv').config();
let app = express();
app.use(express.json());

//enquiry-list
app.get("/enquiry-list", async(req,res)=>{
    let enquiryList = await enquiryModel.find();
    res.send({status:1, message:"Enquiry list", data:enquiryList});
})

//enquiry-insert
app.post("/enquiry-insert",(req,res)=>{
    let {sName,sEmail,sPhone,sMessage} = req.body;
    let enquiry = new enquiryModel({
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    })
    enquiry.save().then(()=>{
        res.send({status:1, message:"Enquiry Saves Successfully"});
    }).catch((err)=>{
        res.send({status:0, message:"Error while saving Enquiry", error:err});
    })
})

//delete-enquiry
app.delete("/enquiry-delete/:id", async (req,res)=>{
    let enquiryId = req.params.id;
    let deleteEnquiry = await enquiryModel.deleteOne({_id:enquiryId});
    res.send({status:1, message:"Enquiry delete successfully", id:enquiryId, delRes:deleteEnquiry});
})

//update-enquiry
app.put("/enquiry-update/:id", async (req,res)=>{
    let enquiryId = req.params.id;
    let {sName,sEmail,sPhone,sMessage} = req.body;
    let updateObj = {
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    }
    let updateEnquiry = await enquiryModel.updateOne({_id:enquiryId}, updateObj);
    res.send({status:1, message:"Enquiry update successfully",updateRes:updateEnquiry})
})


//connect to mongodb
mongoose.connect(process.env.url).then (()=>{
    console.log("connected to mongodb");
    app.listen(process.env.port,()=>{
        console.log("server is running on port"+ process.env.port);
    })
})