'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servis.init({
    merk: DataTypes.STRING,
    motorcycle_type: DataTypes.STRING,
    owner: DataTypes.STRING,
    service_type: DataTypes.ENUM,
    complaint: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    status: DataTypes.ENUM,
    cost: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Servis',
  });
  return Servis;
};