'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Servis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merk: {
        type: Sequelize.STRING
      },
      motorcycle_type: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      service_type: {
        type: Sequelize.ENUM,
        values: ["PERIODIC_SERVICE", "OIL_CHANGE", "etc"]
      },
      complaint: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ["WAITING", "PROCESSING", "DONE"],
        defaultValue: 'WAITING'
      },
      cost: {
        type: Sequelize.INTEGER
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_by: {
        type: Sequelize.STRING,
        defaultValue: "SYSTEM"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Servis');
  }
};