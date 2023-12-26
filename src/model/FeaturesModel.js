const mongoose=require('mongoose');

let DataSchema=mongoose.Schema({

        name:{type:String,required:true},
        description:{type:String,required:true},
        img:{type:String,required:true},
    },
    {
        timestamps:true,versionKey:false
    })

const FeaturesModel=mongoose.model('brands',DataSchema);
module.exports=FeaturesModel;