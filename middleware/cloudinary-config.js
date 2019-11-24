const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'busry',
  api_key: '277233575657466',
  api_secret: 'rlgiRqKo5QntrCbOMUYpchrRX-o',
});

module.exports = cloudinary;
