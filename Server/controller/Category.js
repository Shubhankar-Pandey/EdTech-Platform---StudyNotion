const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}



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
        // console.log("reached in categoryPageDetails , request body : ", req.body);
        // get id
        const {categoryId} = req.body;
        // console.log("categoryId : ", categoryId);

        // validation
        if(!categoryId){
            // console.log("CategoryId is missing");
            return res.status(401).json({
                success : false,
                message : "CategoryId is missing",
            });
        }

        // fetch details -> get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path : "course",
            match: { status: "Published" },
            populate: "ratingAndReview",
        })
        .exec();

        // console.log("selectedCategory : ", selectedCategory);
        
        // validation
        if (!selectedCategory) {
            // console.log("Category not found.");
            return res
            .status(404)
            .json({ success: false, message: "Category not found" })
        }
        if(selectedCategory?.course?.length === 0){
            // console.log("selectedCategory.course.length === 0");
            return res.status(401).json({
                success : false,
                message : "There is no course in this category",
            });
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = null;

        if (categoriesExceptSelected.length > 0) {
            const randomIndex = getRandomInt(categoriesExceptSelected.length);

            differentCategory = await Category.findById(
                categoriesExceptSelected[randomIndex]._id
            )
            .populate({
                path: "course",
                match: { status: "Published" },
            })
            .exec();
        }

        // get top 5 best selling courses
        // HW : Do your self

        const allCategories = await Category.find()
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)


        // return response
        return res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategory,
                mostSellingCourses
            },
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in fetching category page details",
            error : error.message,
        });
    }
}
