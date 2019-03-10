const path = require('path')

const common = {
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../../db.sqlite'),
  operatorsAliases: false
}

module.exports = {
  development: common,
  production: common
}
