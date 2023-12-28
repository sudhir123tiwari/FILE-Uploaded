const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
const fileSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    imageUrl:{
        type:String

    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);
        let tramsporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,

            },
        });
        let info=await tramsporter.sendMail({
            from:"codehelp",
            to:doc.email,
            subject:"New file upload cloudenry",
            html:`<h2> Hello ji kaise ho</h2> <p>File Upload </p>`,

        });
        console.log(info);

    }
    catch(error){
        console.log(error);

    }
})
const File=mongoose.model("File",fileSchema);
module.exports=File;