
const Tags = require("../models/category");

// create a tag handller Function

exports.createCategory = async (req , res) =>{

    try{

        //data fetch
        const {name, description} = req.body;

        //validation
        if(!name || !description)
        {
            return res.status(400).json({
                success : false,
                message : "All field are required",
            })
        }
        // create entry in db
        const CategoryDetails = await CategoryDetails.create({
          name: name,
          description: description,
        });
        console.log(description);
        //return response

        return res.status(200).json({
            success: true,
            message:"Tag created Successfull"
        })
       

    }catch(error){

        return res.status(500).json({
            success : false,
            message : error.message,
        });
        
    }
};

//getAlltags handler function

exports.showAllCategory = async (req , res) => {
    try{

        const allCategory = await Category.find({} , {name:true , description: true});

        res.status(200).json({
          success: false,
          data: allCategorys,
        });

    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
              .populate("courses")
              .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
           
            // mujhe aisi category ki id nikal kar do jo is cotegory id me nhi hai matalab category idid ko chodkar
            //baki sb mil jayengi
        
            const differentCategories = await Category.find({
              _id: { $ne: categoryId },
            })
              .populate("courses")
              .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}