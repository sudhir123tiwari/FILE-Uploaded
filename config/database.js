const mongoose=require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connection Successfull"))
    .catch( (error) =>{
        console.log("Issue in connection with DB");
        console.error(error);
        process.exit(1);
    });
}