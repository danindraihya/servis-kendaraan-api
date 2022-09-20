const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const connectionDB = require('../utils/database');

const router = Router();

router.post(
    '/service',
    // validation input body
    body('merk')
        .exists()
        .withMessage("merk is required"),
    body('motorcycle_type')
        .exists()
        .withMessage("motorcycle_type is required"),
    body('owner')
        .exists()
        .withMessage("owner is required"),
    body('service_type')
        .exists()
        .withMessage("service_type is required")
        .isIn(['PERIODIC_SERVICE', 'OIL_CHANGE', 'etc'])
        .withMessage('service_type value must be one of (PERIODIC_SERVICE, OIL_CHANGE, etc)'),
    body('complaint')
        .exists()
        .withMessage("complaint is required"),
    body('phone_number')
        .exists()
        .withMessage("phone_number is required"),
    body('cost')
        .exists()
        .withMessage("cost is required")
        .isInt()
        .withMessage("Value of cost must be integer"),

    async (req, res, next) => {

        try {

            const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
                return {
                    param: param,
                    msg: msg
                };
            };

            // check validation
            const errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: "INVALID_REQUEST",
                    message: "Invalid request",
                    errors: errors.array()
                });
            }

            const inputMerk = req.body.merk;
            const inputMotorType = req.body.motorcycle_type;
            const inputOwner = req.body.owner;
            const inputServiceType = req.body.service_type;
            const inputComplaint = req.body.complaint;
            const inputPhone = req.body.phone_number;
            const inputCost = req.body.cost;

            const Servis = connectionDB.defineUserModel();

            // create new data servis
            let newServis = await Servis.create({
                merk: inputMerk,
                motorcycle_type: inputMotorType,
                owner: inputOwner,
                service_type: inputServiceType,
                complaint: inputComplaint,
                phone_number: inputPhone,
                cost: inputCost
            });


            return res.status(200).json({
                status: "SUCCESS",
                message: "Success create a new order",
                data: newServis
            });

        } catch (error) {
            return res.status(500).json({
                status: "UNKNOWN_ERROR",
                message: "Unknown error"
            });
        }


    });

router.get('/service', async (req, res, next) => {

    try {

        const statusValue = ["WAITING", "PROCESSING", "DONE"];

        let status = req.query.status;

        const Servis = connectionDB.defineUserModel();

        const sequelize = connectionDB.sequelizeObject();

        if (status != null && statusValue.includes(status)) {

            const dataServis = await Servis.findAll({
                attributes: [
                    'id',
                    'created_by',
                    [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'created_at'],
                    [sequelize.fn("DATE_FORMAT", sequelize.col("updatedAt"), "%d-%m-%Y %H:%i:%s"), 'updated_at'],
                    'is_deleted',
                    'merk',
                    'motorcycle_type',
                    'owner',
                    'service_type',
                    'complaint',
                    'phone_number',
                    'status',
                    'cost'
                ],
                where: {
                    status: status
                }
            });

            return res.status(200).json({
                status: "SUCCESS",
                message: "Success get all order",
                data: dataServis
            });

        }

        const dataServis = await Servis.findAll({
            attributes: [
                'id',
                'created_by',
                [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'created_at'],
                [sequelize.fn("DATE_FORMAT", sequelize.col("updatedAt"), "%d-%m-%Y %H:%i:%s"), 'updated_at'],
                'is_deleted',
                'merk',
                'motorcycle_type',
                'owner',
                'service_type',
                'complaint',
                'phone_number',
                'status',
                'cost'
            ]
        });

        if (dataServis.length < 1) {
            return res.status(404).json({
                status: "DATA_NOT_FOUND",
                message: "Data not found",

            });

        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "Success get all order",
            data: dataServis
        });

    } catch (error) {
        return res.status(500).json({
            status: "UNKNOWN_ERROR",
            message: "Unknown error"
        });
    }

});

router.put(
    '/service/:id/:status',
    async (req, res, next) => {

        try {

            const statusValue = ["WAITING", "PROCESSING", "DONE"];
            const sequelize = connectionDB.sequelizeObject();

            const servisId = req.params.id;
            const status = req.params.status;

            if (!statusValue.includes(status)) {
                return res.status(400).json({
                    status: "INVALID_REQUEST",
                    message: "Status value must be one of (WAITING, PROCESSING, DONE)"
                });
            }

            const Servis = connectionDB.defineUserModel();

            const dataServisUpdate = await Servis.update({ status: status }, {
                where: {
                    id: servisId
                }
            });

            if (dataServisUpdate[0] == 0) {
                return res.status(404).json({
                    status: "DATA_NOT_FOUND",
                    message: "Data not found",

                });
            }


            const dataServis = await Servis.findOne({
                attributes: [
                    'id',
                    'created_by',
                    [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'created_at'],
                    [sequelize.fn("DATE_FORMAT", sequelize.col("updatedAt"), "%d-%m-%Y %H:%i:%s"), 'updated_at'],
                    'is_deleted',
                    'merk',
                    'motorcycle_type',
                    'owner',
                    'service_type',
                    'complaint',
                    'phone_number',
                    'status',
                    'cost'
                ],
                where: {
                    id: servisId
                }
            });

            return res.status(200).json({
                status: "SUCCESS",
                message: "Success update status order",
                data: dataServis
            });

        } catch (error) {
            return res.status(500).json({
                status: "UNKNOWN_ERROR",
                message: "Unknown error"
            });
        }

    });

module.exports = router;