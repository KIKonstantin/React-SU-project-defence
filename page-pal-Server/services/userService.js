const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const secret = 'l2=],f349-1fk23490-[],[0,i-';
// list of loggedout users
const tokenBlackList = new Set();


async function register(email, password) {
    const excisting = await User.findOne({ email }).collation({locale: 'en', strength: 2});
    if(excisting){
        throw new Error('Email is taken');
    }

    const user = await User.create({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    })

    return createToken(user);
}

async function login(email, password){
    const user = await User.findOne({ email }).collation({locale: 'en', strength: 2});
    if(!user){
        throw new Error('User not found!');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if(!match){
        throw new Error('User not found!');
    }
    return createToken(user);
}

async function logout(token){
    tokenBlackList.add(token);
}

function createToken (user){
    const payload = {
        _id: user._id,
        email: user.email
    };
    
    return {
        _id: user._id,
        email: user.email,
        accessToken: jwt.sign(payload, secret)
    };
}
// Validate Token function
function parseToken(token){
//   TODO: scan blacklist for token
    if(tokenBlackList.has(token)){
        throw new Error('Token is blacklisted');
    }
    return jwt.verify(token, secret);

}

module.exports = {
    register,
    login,
    logout,
    parseToken
};