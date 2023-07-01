const model = {}
const users = require('./users')

model.td_users = users.td_users
model.td_roles = users.td_roles

module.exports = model