const mongoose=require('mongoose');

let DataSchema=mongoose.Schema({
    brandName:{type:String,required:true},
    brandimg:{type:String,required: true},
},
{
   timestamps:true,versionKey:false
})

const BrandModel=mongoose.model('brands',DataSchema);
module.exports=BrandModel;