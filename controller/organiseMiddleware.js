let OrganiseModel = require('../model/OrganiseSchema')
let todoModel = require('../model/todoSchema')

const organiseMiddleware=async(req,res)=>{
    try {
        let value = await todoModel.find({prority:'high'})
        console.log(value);

        // let valueOrg = await OrganiseModel.find({})
        // let title = req.body
        // console.log(req.body);
        
        
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
        
    }
}

module.exports = {organiseMiddleware}