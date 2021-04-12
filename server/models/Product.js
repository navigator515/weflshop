const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    
    writer : {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String,
        
    },
    price:{
        Type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    views:{
        type:Number,
        default:0
    },
    interest:{
        type:String
    },
    area:{
        type:String
    }
},{timestamps:true})// 시간을 자동으로 해줌 



const Product = mongoose.model('Product', productSchema);

module.exports = { Product }