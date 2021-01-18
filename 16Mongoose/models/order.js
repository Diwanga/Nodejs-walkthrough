const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({

products : [
    {
        product : {type: Object, required : true},//type object kiynne ethenta document ekak enne,  ona nm product eke fiels dala hadanna aki
        quantity : { type : Number , require : true}
    }
],
user : {
    name : {
        type : String,
        required : true
    },
    userId: {
        type : Schema.Types.ObjectId,
        require : true,
        ref : 'User'
    }
}


})


module.exports = mongoose.model('Order',orderSchema)