const express = require("express")
const {createProductSecurity , createProductController, createVariantController, getProduct, getVariants, productDeleteController, deleteVariantControlller } = require("../../controller/productController")
const router = express.Router()
const multer  = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file.originalname.split(".")[1])
      cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split(".")[1]}`)
      
    }
    
  })

  
  const upload = multer({ storage: storage })

// router.post("/createproduct"  , createProductSecurity , createProductController)
router.post("/createproduct"  , upload.single('image') , createProductController)
router.post("/createvariants" , upload.single('image') , createVariantController)
router.get("/getproduct" , getProduct)
router.post("/deleteproduct" , productDeleteController)
router.get("/getvariants" , getVariants)
router.post("/deletevariants" , deleteVariantControlller)
module.exports = router