const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express()
const status = require('../../helpers/status_helpers')
const model = require('../../config/models')

router.post('/v1/login', async(req, res, next) => {
    try {
        let { email, password } = req.body
        
        let payload = {
            email: email
        }

        await model.td_users.findOne({
            where:{
                email: email
            },
            raw: true
        }).then(async (response) => {
            if(response != null){
                let role = await model.td_roles.findOne({
                    where:{
                        id: response.id_role
                    }
                })

                let payload_role = {
                    nama_role: role.nama_role
                }

                let checkPassword = bcrypt.compareSync(password, response.password)

                if(checkPassword){
                    const accessToken = jwt.sign(payload, process.env.SECRET_TOKEN, { algorithm: 'HS512', expiresIn: '1h' })

                    delete response.id_role
                    delete response.password
                    delete response.waktu_rekam
                    delete response.waktu_ubah
                    Object.assign(response, payload_role)

                    let result = {
                        users: response,
                        token: 'Bearer',
                        access_token: accessToken
                    }

                    return res.status(status.statusCode.success).json(status.successMessage(result))
                }else{
                    return res.status(status.statusCode.bad).json({
                        code: "02",
                        status: false,
                        message: "Password yang anda masukkan salah"
                    })
                }
            }

            return res.status(status.statusCode.bad).json({
                code: '02',
                status: false,
                message: 'Email atau password yang anda masukkan salah!',
            })
        }).catch((error) => {
            return res.status(status.statusCode.bad).json(status.errorMessage(error))
        })

    } catch (error) {
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
})

router.post('/v1/refreshToken', async(req, res, next) => {
    try {
        const { email, password } = req.body
        const payload = {
            email: email,
            password: password
        }

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { algorithm: 'HS512', expiresIn: '1h' })
        const result = {
            token: 'Bearer',
            access_token: refreshToken
        }

        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
})

module.exports = router