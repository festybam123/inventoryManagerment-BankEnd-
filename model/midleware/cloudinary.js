const multer = require('multer');
const cloudinary = require('../../configs/cloudinaryConfigs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'inventory_images',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;

