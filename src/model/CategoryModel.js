const mongoose=require('mongoose');

let DataSchema=mongoose.Schema({

        categoryname:{type:String,required:true},
        categoryimg:{type:String,required:true},
    },
    {
        timestamps:true,versionKey:false
    })

const CategoryModel=mongoose.model('categories',DataSchema);
module.exports=CategoryModel;