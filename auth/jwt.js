const jwt = require ('jsonwebtoken')

const secret = 'iIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1N'
const sign = payload => jwt.sign(payload, secret, { expiresIn: 86400 })
const verify = token => jwt.verify(token, secret)

module.exports.sign = sign;
module.exports.verify = verify;