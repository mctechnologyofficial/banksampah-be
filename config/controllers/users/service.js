const service = {}
const model = require('../../models')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs')

service.getAllUsers = async(data, user) => {
    const { id_user, page, keyword } = data
    let result, countResult
    const pageSize = 10
    
    const filters = {
        [Op.or]: []
    }

    if(keyword){
        filters[Op.or].push({
            [Op.or]: [
                {nomor_induk_nasabah: {[Op.like]: `%${keyword}%`}},
                {nama: {[Op.like]: `%${keyword}%`}},
                {nomor_kontrak: {[Op.like]: `%${keyword}%`}},
            ]
        })
    }else{
        delete filters[Op.or]
    }

    const offset = (page - 1) * pageSize

    if(!id_user){
        // get all
        countResult = await model.td_users.findAll()

        result = await model.td_users.findAll({
            where: filters,
            limit: pageSize,
            offset: offset,
            raw: true
        })
    }else{
        // show
        countResult = await model.td_users.findAll({
            where:{
                id: id_user
            }
        })

        result = await model.td_users.findOne({
            where: {
                id: id_user
            }
        })
    }

    const pageCount = Math.ceil(countResult.length / pageSize);

    return {
        count: countResult.length,
        pageCount: pageCount,
        data: result
    }
}

service.postUsers = async(data) => {
    let result

    const role = await model.td_roles.findOne({
        where: {
            nama_role: "Nasabah"
        }
    })

    const hashPassword = bcrypt.hashSync(data.password)

    let payload = {
        id: data.id,
        id_role: role.id,
        nomor_induk_nasabah: data.nomor_induk_nasabah,
        nama: data.nama,
        email: data.email,
        password: hashPassword,
        telepon: data.telepon,
        alamat: data.alamat,
        waktu_rekam: Date()
    }

    if(!payload.id){
        result = await model.td_users.create(payload)
    }else{
        result = await model.td_users.update(payload, {
            where: {
                id: payload.id
            }
        })
    }

    return result
}

service.deleteUsers = async(data) => {
    let result = await model.td_users.destroy({ where:{ id: data } })

    return result
}

service.getAllRoles = async(data) => {
    const { id } = data
    let result

    if(!id){
        result = await model.td_roles.findAll()
    }else{
        result = await model.td_roles.findOne({
            where:{
                id: id
            }
        })
    }

    return result
}

service.postRoles = async(data) => {
    let result
    const payload = {
        id: data.id,
        nama_role: data.nama_role
    }

    if(!payload.id){
        result = await model.td_roles.create(payload)
    }else{
        result = await model.td_roles.update(payload, {
            where:{
                id: payload.id
            }
        })
    }

    return result
}

service.deleteRoles = async(data) => {
    const { id } = data
    let result
    result = await model.td_roles.destroy({ where: { id: id } })

    return result
}

module.exports = service