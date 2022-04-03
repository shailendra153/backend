const Category = require('../model/category.model');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "shailendra153",
    api_key: "934837375542371",
    api_secret: "zHeIVGAQP0FDhsmIV-a38EYA24w"
});



exports.saveCategory = async(request, response, next) => {
    let image = ""
    await cloudinary.v2.uploader.upload(request.file.path)
        .then(result => {
            image = result.url;

            console.log(image)
        })
        .catch(err => {
            console.log(err)
        })
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    console.log("near Saving")
    const category = new Category();
    category.categoryName = request.body.categoryName;
    category.categoryImageUrl = image;
    category.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something is Wrong" });
        });
};

exports.deleteCategory = (request, response, next) => {
    Category.deleteOne({ _id: request.params.categoryId })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: "success" });
            else
                return response.status(204).json({ message: "Item Not found" });

        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" });
        });
};
exports.updateCategory = (request, response, next) => {

    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    const categoryName = request.body.categoryName;
    let imageUrl = request.body.oldImageUrl;
    if (request.file)
        imageUrl = "https://smakemymeal.herokuapp.com/images/" + request.file.filename;
    id = request.body.categoryId;
    Category.updateOne({ _id: id }, {
            $set: {
                categoryName: categoryName,
                categoryImageUrl: imageUrl
            }

        })
        .then(result => {
            if (result.modifiedCount)
                return response.status(202).json({ messgae: "success" });
            else
                return response.status(204).json({ messgae: "item not Found" })
        })
        .catch(err => {
                console.log(err);
                return response.status(500).json({ message: "Oops!Something Went Wrong" })
            }

        )

};
exports.viewCategory = (request, response, next) => {

    Category.find()
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops! Something Went Wrong" });
        });


}