
const express = require('express');
const router = express.Router();
const FileController = require('./FileController');

router.post('/upload', FileController.uploadFile);
router.get('/download/:fileId', FileController.downloadFile);
router.delete('/delete/:fileId', FileController.deleteFile);

module.exports = router;
