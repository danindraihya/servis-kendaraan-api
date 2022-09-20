const Sequelize = require('sequelize');
require('dotenv').config();

const DB_CONNECTION = process.env.DB_CONNECTION || 'mysql';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || 'ServisKendaraan';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';

module.exports = {
    defineUserModel: function () {
        const sequelize = connectToServer();

        return sequelize.define('servis', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            created_by: Sequelize.STRING,
            is_deleted: Sequelize.BOOLEAN,
            merk: Sequelize.STRING,
            motorcycle_type: Sequelize.STRING,
            owner: Sequelize.STRING,
            service_type: Sequelize.STRING,
            complaint: Sequelize.STRING,
            phone_number: Sequelize.STRING,
            status: Sequelize.STRING,
            cost: Sequelize.BOOLEAN,
        });
    },
    sequelizeObject: connectToServer
}

function connectToServer() {
    return new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_CONNECTION
    });

}