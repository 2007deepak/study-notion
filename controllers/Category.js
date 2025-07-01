
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

        const allCategory = await Cotegory.find({} , {name:true , description: true});

        res.status(200).json({
            success : false,
            message:"All tags returned Successfull"
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};