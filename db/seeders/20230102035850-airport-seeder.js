'use strict';
const airports = require('../../utils/airports/airports.json')

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
    //const airportsFilter = airports.filter(port => port.country == 'Indonesia')
    for (const airport of airports) {
      await queryInterface.bulkInsert('Airports', [{
        name: airport.name,
        iata_code: airport.iata_code,
        city: airport.city,
        country: airport.country,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airports', null, {})
  }
};
