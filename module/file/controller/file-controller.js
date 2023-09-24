const FileService = require('../../FileManager/Service/FileService');

module.exports = {
    uploadFile: async (req, res) => {
        try {
            console.log(req.file);
            // Assuming req.body contains metadata and req.file contains file information
            const fileId = await FileService.uploadFile(req.body, req.file);
            res.status(201).json({
                message: 'File uploaded successfully',
                fileId: fileId
            });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading file: ' + error.message });
        }
    },

    downloadFile: async (req, res) => {
        try {
            // Get the file's metadata and path from the DB using the provided ID
            const file = await FileService.getFileById(req.params.fileId);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
            // Send the file as a response
            res.download(file.path, file.old_name);
        } catch (error) {
            res.status(500).json({ message: 'Error downloading file: ' + error.message });
        }
    },

    deleteFile: async (req, res) => {
        try {
            await FileService.deleteFileById(req.params.fileId);
            res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting file: ' + error.message });
        }
    }
};
