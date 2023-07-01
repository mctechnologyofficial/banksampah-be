const controller = {}
const service = require('./service')
const status = require('../../../helpers/status_helpers')

controller.getAllUsers = async(req, res) => {
    try {
        const user = req.user
        const data = req.query
        let result = await service.getAllUsers(data, user)

        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        console.log(error.message)
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
}

controller.postUsers = async(req, res) => {
    try {
        const data = req.body
        let result = await service.postUsers(data)
        
        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        console.log(error.message)
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
}

controller.deleteUsers = async(req, res) => {
    try {
        const { id } = req.params
        let result = await service.deleteUsers(id)
        
        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        console.log(error.message)
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
}

controller.getAllRoles = async(req, res) => {
    try {
        const data = req.query
        let result = await service.getAllRoles(data)
        
        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        console.log(error.message)
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
}

controller.postRoles = async(req, res) => {
    try {
        const data = req.body
        let result = await service.postRoles(data)
        
        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        console.log(error.message)
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
}

controller.deleteRoles = async(req, res) => {
    try {
        const data = req.params
        let result = await service.deleteRoles(data)
        
        return res.status(status.statusCode.success).json(status.successMessage(result))
    } catch (error) {
        console.log(error.message)
        return res.status(status.statusCode.bad).json(status.errorMessage(error))
    }
}

module.exports = controller