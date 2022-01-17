const cloudinary = require('cloudinary');


cloudinary.config({ 
    cloud_name: 'umbrellasis', 
    api_key: '951244559855667', 
    api_secret: 'Lu3osf9IpOMjBBJpOIkpfOChAR0' 
  });

module.exports = cloudinary; 