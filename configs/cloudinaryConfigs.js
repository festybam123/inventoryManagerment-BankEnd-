const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dm94dsrnp', 
    api_key: '963285534485915', 
    api_secret: '<your_api_secret>'
});

module.exports = cloudinary;