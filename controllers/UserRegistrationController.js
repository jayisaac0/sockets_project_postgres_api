require('../models/UserRegistration')();
const pool = require('../database/ConnectionString');
const validateUser = require('../validations/UserRegistrationValidation');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    
    static async createUser(request, response) {
        const {error} = validateUser(request.body);
        if (error) return response.status(400).json({message: error.details[0].message});

        const {socket_auth_username, socket_auth_useremail, socket_auth_userpassword} = request.body;
        
        const socket_auth_users_public_id = Math.floor(Date.now());
        const salt = await bcrypt.genSalt(10);
        const hashed_socket_auth_userpassword = await bcrypt.hash(socket_auth_userpassword, salt);
        
        const sqlFetchRequest = `SELECT * FROM users WHERE socket_auth_useremail='${socket_auth_useremail}'`;
        const sqlPostRequest = `INSERT INTO users(socket_auth_users_public_id, socket_auth_username, socket_auth_useremail, socket_auth_userpassword) 
        VALUES('${socket_auth_users_public_id}', '${socket_auth_username}', '${socket_auth_useremail}', '${hashed_socket_auth_userpassword}')`;
        

        let user = await pool.query(sqlFetchRequest);
        if(user.rowCount > 0) { 
            return response.status(200).json({message: 'Username or email already already taken'});
        };

        user = await pool.query(sqlPostRequest);
        return response.status(200).json({ message: 'User account successfully created', data: user});
 
    }
};

module.exports = UserController;