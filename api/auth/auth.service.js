const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(fullname, password) {
    logger.debug(`auth.service - login with email: ${fullname}`)

    const user = await userService.getByUsername(fullname)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup(fullname, password, email) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with fullname: ${fullname}`)
    if (!password || !fullname || !email) return Promise.reject('fullname, email and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ fullname, password: hash, email })
}

module.exports = {
    signup,
    login,
}