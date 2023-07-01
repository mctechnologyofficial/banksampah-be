const users = {}
const Sequelize = require('sequelize')
const db = require('../../database')
const { v4: uuidv4 } = require("uuid");

users.td_users = db.define(
    'users',
    {
        id:{
            type: Sequelize.CHAR(255),
            field: "id",
            primaryKey: true,
            defaultValue: () => {
                return uuidv4()
            }
        },
        id_role: {
            type: Sequelize.CHAR(255),
            field: "id_role",
        },
        nomor_induk_nasabah: {
            type: Sequelize.CHAR(255),
            field: "nomor_induk_nasabah"
        },
        nama: {
            type: Sequelize.TEXT,
            field: "nama"
        },
        email: {
            type: Sequelize.CHAR(255),
            field: "email"
        },
        password: {
            type: Sequelize.CHAR(255),
            field: "password"
        },
        telepon: {
            type: Sequelize.CHAR(255),
            field: "telepon"
        },
        alamat: {
            type: Sequelize.TEXT,
            field: "alamat"
        },
        waktu_rekam: {
            type: Sequelize.DATE,
            field: "waktu_rekam"
        },
        waktu_ubah: {
            type: Sequelize.DATE,
            field: "waktu_ubah"
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

users.td_roles = db.define(
    'roles',
    {
        id:{
            type: Sequelize.CHAR(255),
            field: "id",
            primaryKey: true,
            defaultValue: () => {
                return uuidv4()
            }
        },
        nama_role: {
            type: Sequelize.CHAR(255),
            field: "nama_role",
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = users