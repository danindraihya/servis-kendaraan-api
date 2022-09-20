const Sequelize = require('sequelize');

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
    return new Sequelize('ServisKendaraan', 'root', 'root', {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    });

}