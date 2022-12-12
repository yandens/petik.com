"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PaymentMethods", [
      {
        method: "Virtual Account",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        method: "E-Wallet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     *
     * */

    await queryInterface.bulkDelete("PaymentMethods", null, {});
  },
};
