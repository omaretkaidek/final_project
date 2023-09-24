const knex = require('knex')(require('../../../knexfile'));

module.exports = {
    createFileEntry: async (data) => {
        try {
            const fileId = await knex('files').insert(data).returning('fileId'); 
            // Note: .returning() might not work with MySQL; you might need to do a separate query to get the ID
            return fileId[0];
        } catch (error) {
            throw new Error('Error inserting file entry: ' + error.message);
        }
    },

    getFileEntryById: async (id) => {
        try {
            const file = await knex('files').where('fileId', id).first();
            if (!file) {
                throw new Error('File not found');
            }
            return file;
        } catch (error) {
            throw new Error('Error fetching file by ID: ' + error.message);
        }
    },

    deleteFileEntryById: async (id) => {
        try {
            const rowsDeleted = await knex('files').where('fileId', id).delete();
            if (rowsDeleted === 0) {
                throw new Error('File not found or already deleted');
            }
            return true;
        } catch (error) {
            throw new Error('Error deleting file entry: ' + error.message);
        }
    },
};
