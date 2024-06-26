const express = require("express")
const categoryList = require('../model/categorySchema')
const subCategoryList = require ("../model/subCategorySchema")
async function createCategoryController(req, res) {

    const {name,description ,subCategory} = req.body;
    const duplicateCategory = await categoryList.find({name})
    if (duplicateCategory.length > 0) {
       return res.json({
            error: "This Category is Already Exist"
        })
    }
    if (!name){
      return  res.json({
            error : "Please Enter Category Name"
        })
    }
    if (!description){
      return  res.json({
            error : "Please Enter Category Description"
        })
    }

    const category = new categoryList({
        name,
        description ,
        subCategory
    })


    category.save()
    // res.redirect("http://localhost:5173/categoryactivestatus")
   return res.json({
 
        success: "Category Created Successfully"
    })


}
async function statusCategoryController(req, res) {
    const {name,Status} = req.body;
    if (Status == "waiting" || Status == "rejected") {
        const statusUpdate = await categoryList.findOneAndUpdate(
            {name} ,
            {$set : {isActive : false  , Status : Status}} ,
            {new : true}
        )
        return res.json ({
            success : (`Status Updated Successfully done to ${Status}`)
        })
    }
    else if(Status == "approved"){
        const statusUpdate = await categoryList.findOneAndUpdate(
            {name},
            {$set :{isActive : true , Status : Status}},
            {new : true}
        )
        return res.json ({
            success : (`Status Updated Successfully done to ${Status}`)
        })
    }

}
 async function createSubCategoryController (req ,res){

        const {name , description , category} = req.body 

        const duplicateSubCategory = await subCategoryList.find({name})
        if (duplicateSubCategory.length > 0){
          return  res.json({
                error : "This Category Is Alreay Exist"
            })
        }
        else if(!name || !description){
           return res.json({
                error : "Enter Name & Description to Create Sub Category" 
            }) 
        }
        const subCategory = new subCategoryList({
            name ,
            description ,
            category
        })
        


        const updateCategory = await categoryList.findOneAndUpdate(
             { _id : subCategory.category} ,
             {$push : {subCategory : subCategory._id}} ,
             {new : true}
            )
            
            subCategory.save()
            return  res.json ({
              success : "Sub Category Create Successfully Done"
          })

        
}

async function statusSubCategoryController (req , res){
    const {name , Status} = req.body
    if (Status == "waiting" || Status == "rejected"){
        const statusUpdateSubCategory = await subCategoryList.findOneAndUpdate(
            {name} ,
            {$set : {isActive : false , Status : Status}} ,
            {new : true}
        )
        res.json(`Sub Category Updated to ${Status}`)
    }
    else if (Status == "approved"){
        const statusUpdatedSubCategory = await subCategoryList.findOneAndUpdate(
            {name},
            {$set : {isActive :true , Status : Status } } ,
            {new : true}
        )
        res.json(`sub Category Updated to ${Status}`)
    }
}
async function getCategory(req,res)  {
const data = await categoryList.find({}).populate("subCategory")
    res.json(data)
}
async function getSubCategory(req ,res){
    const data = await subCategoryList.find({})
    res.json(data)
}

module.exports = {createCategoryController,statusCategoryController ,createSubCategoryController ,statusSubCategoryController , getCategory , getSubCategory}  