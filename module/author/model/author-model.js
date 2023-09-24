// userModel.js

const knex = require('knex')(require('../../../knexfile'));

const tableName = 'authors';

const UserModel = {
    // Read a user by ID
    async getAuthorById(authorId) {
        return await knex(tableName).where({ authorId }).first();
    },

    async createAuthor(authorData){
        return knex(tableName).insert(authorData)
    },
    // async createUser(authorData){
    //     return knex(tableName).insert(
    //         {
    //             firstName: authorData.firstName,
    //             middleName: authorData.middleName,
    //             lastName: authorData.lastName,
    //             dateOfBirth: authorData.dateOfBirth,
    //             deathDate: authorData.deathDate,
    //             officialWebsite: authorData.officialWebsite,
    //         }
    //     )
    // },
};

module.exports = UserModel;