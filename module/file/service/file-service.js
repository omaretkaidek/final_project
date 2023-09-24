const fileModel = require('../model/file-model');
const fs = require('fs').promises; // Using promises for async/await compatibility
const path = require('path');

module.exports = {
    uploadFile: async (data, file) => {
        try {
            // Define the new file name and locatio
            const newFileName = `${Date.now()}_${data.originalname}`;
            let rootDir = path.join(__dirname, '../../../');
            const storagePath = path.join(rootDir, `uploads/${file}`, newFileName);
            // Move the file from the temp location to our desired location
            await fs.rename(data.path, storagePath);

            // Insert the file metadata into the database
            const fileData = {
                oldName: data.originalname,
                newName: newFileName,
                folder: file,
                path: storagePath
            };

            const fileId = await fileModel.createFileEntry(fileData);

            return fileId;

        } catch (error) {
            throw new Error('Error during file upload: ' + error.message);
        }
    },

    getFileById: async (id) => {
        try {
            const file = await fileModel.getFileEntryById(id);
            if (!file) {
                throw new Error('File not found');
            }
            return file;

        } catch (error) {
            throw new Error('Error fetching file by ID: ' + error.message);
        }
    },

    deleteFileById: async (id) => {
        try {
            // Get the file entry from the database
            const file = await fileModel.getFileEntryById(id);

            // Delete the file from the filesystem
            await fs.unlink(file.path);

            // Delete the file entry from the database
            await fileModel.deleteFileEntryById(id);

            return true;

        } catch (error) {
            throw new Error('Error deleting file: ' + error.message);
        }
    },
};
