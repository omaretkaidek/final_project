// userService.js

const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

// If you have an email service or other services, you'd also import them here
// const EmailService = require('./emailService');

const UserService = {
  // Retrieve a user by ID
  async getUserById(userId) {
    return await UserModel.getUserById(userId);
  },

  // Update a user by ID
  async updateUserById(userId, updatedData) {
    return await UserModel.updateUserById(userId, updatedData);
  },

  // Delete a user by ID
  async deleteUserById(userId) {
    return await UserModel.deleteUserById(userId);
  },

  async getUserProfile(userId) {
    try {
      const user = await UserModel.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const { password, ...noPassword } = user;
      return noPassword;
    } catch (error) {
      throw new Error(`Error fetching user profile: ${error.message}`);
    }
  },

  async authenticateUser(email, password) {
    const user = await UserModel.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid credentials");
    }
    const tokenPayload = { id: user.id };
    const token = jwt.sign(tokenPayload, "your_jwt_secret", {
      expiresIn: "1h",
    });
    return token;
  },

  async registerUser(userData) {
    const { Password, groupId, ...userDetails } = userData;

    userDetails.Password = bcrypt.hashSync(Password, 10);
    // If a groupId is provided, check if it exists
    if (groupId) {
      const groupExists = await UserModel.groupExists(groupId);
      if (!groupExists) {
        throw new Error("The provided groupId does not exist");
      }
    }else{
      throw new Error("provide groupId");
    }

    // Insert user data into the Users table
    const [userId] = await UserModel.createUser(userDetails);
    // If a groupId is provided, link the user to the group in the UserGroups table
    if (groupId) {
      await UserModel.assignUserToGroup(userId, groupId);
    }

    return userId
  },

  async signInUser(email, password) {
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatches = bcrypt.compareSync(password, user.Password);
    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    return user; // returns user details
  },

  async getUserPermissions(userId) {
    return await UserModel.getPermissionsByUserId(userId);
  },
  
  async setProfilePhotoId(userId, fileId){
    await UserModel.setProfilePhotoId(userId, fileId);
  },

  async getProfilePhotoId(userId){
    return UserModel.getProfilePhotoId(userId);
},

  async removeProfilePhotoId(userId){
    return UserModel.removeProfilePhotoId(userId);
  },
};

module.exports = UserService;
