const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      { name: 'Admin', email: 'admin@mail.ru', password: await bcrypt.hash('123', 10)},

  ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
