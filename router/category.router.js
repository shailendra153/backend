const categoryController = require('../controller/category.controller');
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post("/add-category", upload.single('categoryImageUrl'), body('categoryName').notEmpty(), categoryController.saveCategory);
router.get("/delete-category/:categoryId", categoryController.deleteCategory);
router.get("/view-category", categoryController.viewCategory);
router.post("/update-category", upload.single('categoryImageUrl'), categoryController.updateCategory);


module.exports = router;