const express = require('express')
const router = express.Router()
const {addCategory,deleteCategory} = require('../controllers/categoryController')
const {protect,adminProtect}=require('../middleware/authMiddleware')

router.post('/',protect,adminProtect,addCategory)
router.delete('/:id',protect,adminProtect,deleteCategory)

module.exports=router