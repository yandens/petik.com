'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const encrypted = await bcrypt.hash("admin123", 10)
    await queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password: encrypted,
      role_id: 1,
      user_type: "BASIC",
      status: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
