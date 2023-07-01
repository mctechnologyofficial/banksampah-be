const jwt = require('jsonwebtoken')
const status = require('../helpers/status_helpers')

const doAuth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

		if (authHeader == undefined || authHeader == null) {
			return res.status(status.statusCode.bad).json(status.errorMessage({error: 'invalid_token', error_description: 'Token is missing'}));
		}

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if(err) return res.status(status.statusCode.bad).json(status.errorMessage(err))

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(status.statusCode.error).json(status.errorMessage({error: 'internal_server_error', error_description: err.message}));
    }
}



module.exports = { doAuth }