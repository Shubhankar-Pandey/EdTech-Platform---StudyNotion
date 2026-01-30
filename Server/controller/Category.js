const Category = require("../models/Category");



// *************** create Category ka handler function ***************

exports.createCategory = async(req, res) => {
    try{
        // fetch tag from request body
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(401).json({
                success : false,
                message : "Fill all the details",
            });
        }

        // create entry in db
        const CategoryDetails = await Category.create({
            name,
            description,
        });

        // return response
        return res.status(200).json({
            success : true,
            message : "Category created successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in creating Category",
            error : error.message,
        });
    }
}


// *************** getAllTags ka handler function ***************

exports.showAllCategory = async(req, res) => {
    try{
        const allCategory = await Category.find({},{name : true, description : true});
        
        return res.status(200).json({
            success : true,
            message : "All tags returned successfully",
            data : allCategory,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in fetching allCategory",
            error : error.message,
        });
    }
}



// *************** categoryPageDetails handler function ***************

exports.categoryPageDetails = async(req, res) => {
    try{
        // get id
        const {categoryId} = req.body;

        // validation
        if(!categoryId){
            return res.status(401).json({
                success : false,
                message : "CategoryId is missing",
            });
        }

        // fetch details -> get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId).populate("course").exec();
        
        // validation
        if(selectedCategory.course.length === 0){
            return res.status(401).json({
                success : false,
                message : "There is no course in this category",
            });
        }

        // get courses for different categories
        const differentCategories = await Category.find({
                                                _id : {$ne : categoryId}
                                            })
                                            .populate("course")
                                            .exec();

        // get top 5 best selling courses
        // HW : Do your self


        // return response
        return res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategories,
            },
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Error in fetching category page details",
            error : error.message,
        });
    }
}
