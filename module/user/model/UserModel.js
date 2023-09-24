// userModel.js

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const tableName = 'Users';

const UserModel = {
    // Read a user by ID
    async getUserById(id) {
        return await knex(tableName).where({ id }).first();
    },

    async createUser(userData){
        return knex(tableName).insert(
            {
                Username: userData.Username,
                FirstName: userData.FirstName,
                LastName: userData.LastName,
                Email: userData.Email,
                Password: userData.Password,
            }
        )
    },
    
    async getUserByEmail(email){
        return knex(tableName).where({ email }).first();
    },

    // Update a user by ID
    async updateUserById(id, updatedData) {
        return await knex(tableName).where({ id }).update(updatedData).returning('*');
    },

    // Delete a user by ID
    async deleteUserById(id) {
        return await knex(tableName).where({ id }).del();
    },

    async idExists(id) {
        const user = await knex(tableName).where({ id }).first();
        return Boolean(user); // returns true if the user exists, otherwise false
    },

    async nameExists(Username) {
        const user = await knex(tableName).where({ Username }).first();
        return Boolean(user); // returns true if the user with the given name exists, otherwise false
    },
    
    async assignUserToGroup(userId, groupId){
        return knex('UserGroups').insert({
            UserID: userId,
            GroupID: groupId
        });
    },

    async groupExists(groupId){
        const group = await knex('Group').where('id', groupId).first();
        return Boolean(group);
    },

    async findUserByEmail(email){
        return knex('Users').where('Email', email).first();
    },

    async getPermissionsByUserId(userId){
        return knex('Permissions')
            .join('GroupPermissions', 'Permissions.id', 'GroupPermissions.permissionID')
            .join('UserGroups', 'GroupPermissions.groupID', 'UserGroups.groupID')
            .where('UserGroups.userID', userId)
            .select('Permissions.name');
    },

    async setProfilePhotoId(userId, fileId){
        return knex('Users')
            .where('id', userId)
            .update({ profile_photo_id: fileId });
    },
    
    async getProfilePhotoId(userId){
        const user = await knex('Users').select('profile_photo_id').where('id', userId).first();
        return user.profile_photo_id;
    },
    
    async removeProfilePhotoId(userId){
        return knex('Users').where('id', userId).update({ profile_photo_id: null });
    },
};

module.exports = UserModel;