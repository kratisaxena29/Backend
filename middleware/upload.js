const cloudinary = require('cloudinary').v2;

const uploadImagesMiddleware = async (req, res, next) => {
  try {
    console.log('req.files ::::::::', req);
    let imageFile = req.files['image'];
    console.log('imageFile ::::::::::', imageFile);
    let img = await cloudinary.uploader.upload(imageFile, {
      resource_type: 'auto',
    });
    console.log('video :::::::::', img);
    req.imageData = img.secure_url;
    next();
  } catch (error) {
    res.send(error);
  }
};

const uploadVideosMiddleware = async (req, res, next) => {
  try {
    let videoFile = req.files.video.path;
    let img = await cloudinary.uploader.upload(videoFile, {
      resource_type: 'auto',
    });
    console.log('video :::::::::', img);
    req.imageData = img.secure_url;
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = { uploadImagesMiddleware, uploadVideosMiddleware };
