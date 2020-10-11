const multer = require('multer');
const ErrorResponse = require('../utils/errorResponse');

require('dotenv').config({ path: '../config/config.env' });

// set storage engine
const storage = multer.memoryStorage();

// Set fileSize limit - 1MB
const limits = {
  fileSize: parseInt(process.env.MAX_FILE_UPLOAD, 10),
};

// Specify acceptable file type
const fileFilter = (req, file, cb) => {
  // Accept csv only
  if (!file.originalname.endsWith('.csv')) {
    return cb(new ErrorResponse('Please upload a csv file', 400));
  }
  // else accept the file
  return cb(null, true);
};

// Init upload middleware
const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
