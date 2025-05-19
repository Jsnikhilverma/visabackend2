// import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload our file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // printing a message on successfully uploaded file
    console.log(
      `File is uploaded successfully to cloudinary:\n Path of file is: ${response.url}`
    );
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // it removes the locally saved temporary file as the upload operation got failed
    return null;
  }
};
const uploadMultipleFilesOnCloudinary = async (filePaths = []) => {
  try {
    const response = await Promise.all(
      filePaths.map((filepath) =>
        cloudinary.uploader.upload(filepath, { resource_type: "auto" })
      )
    );
    console.log(
      `File is uploaded successfully to cloudinary:\n Path of file is: ${response}`
    );
    return response;
  } catch (error) {
    console.log(error);

    return null;
  } finally {
    if (filePaths.length) {
      filePaths.forEach((localFilePath) => fs.unlinkSync(localFilePath));
    }
  }
};
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result) {console.log(result); });
module.exports = { uploadOnCloudinary, uploadMultipleFilesOnCloudinary };
