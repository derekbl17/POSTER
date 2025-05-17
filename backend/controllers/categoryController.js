const asyncHandler=require('express-async-handler')
const Category=require('../models/categoryModel')


const addCategory=asyncHandler(async(req,res)=>{
    if (!req.body){
        res.status(400)
        throw new Error('Request body cant be empty')
    }

    const category=await Category.create({
        name:req.body.name
    })
    res.status(200).json(category)
})

const deleteCategory=asyncHandler(async(req,res)=>{
    const category=await Category.findById(req.params.id)
    if(!category){
        res.status(400)
        throw new Error('Category not found')
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

module.exports={addCategory,deleteCategory}