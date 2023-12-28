const File=require("../models/File");
const cloudinary=require("cloudinary").v2;
exports.localFileUpload=async(req,res) =>{
    try{
        const file=req.files.file;
        console.log("File aagyi h", file);
        let path= __dirname + "/files/"+ Date.now() +`.${file.name.split('.')[1]}`;
        console.log("PATH",path)
        file.mv(path,(err) =>{
            console.log(err);
        });
        res.json({
            success:true,
            message:"Local file uploaded successfully",
        });
    }
    catch(error){
        console.log(err);
    }
}

function isFiletypeSupported(type,supportedType){
    return supportedType.includes(type);
}
async function uploadToCloudanry(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    console.log("tempFile Path",file.tempFilePath);
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.imageUpload=async(req,res) =>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log("file aagyi h",file);

        const supportedType=["jpg","png","jpeg"];

        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("file type",fileType);

        if(!isFiletypeSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File is not supported Type",
            })
        }
        console.log("not uploaded");
        const response=await uploadToCloudanry(file,"codehelp");
        console.log(response);
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully yrr.",
        })


    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",

        });

    }
}
exports.videoUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log("video aagyi h",file);

        //validation
        const supportedType=["mp4","mov"];

        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("file type",fileType);

        if(!isFiletypeSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File is not supported Type",
            })
        }
        console.log("not uploaded");
        const response=await uploadToCloudanry(file,"codehelp");
        console.log(response);
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully yrr.",
        })


    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.reduceImageUpload=async(req,res) =>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log("file aagyi h",file);

        const supportedType=["jpg","png","jpeg"];

        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("file type",fileType);

        if(!isFiletypeSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File is not supported Type",
            })
        }
        console.log("not uploaded");
        const response=await uploadToCloudanry(file,"codehelp",90);
        console.log(response);
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully yrr.",
        })


    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",

        });

    }
}