const pool = require('../database/ConnectionString');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUserLogin = require('../validations/AuthenticationValidation');

class AuthController {

    static async AuthenticateUser(request, response) {
        const {error} = validateUserLogin(request.body);
        if (error) return response.status(400).json({message: error.details[0].message});

        const {socket_auth_useremail, socket_auth_userpassword} = request.body;
        const sqlQueryRequest = `SELECT * FROM users WHERE socket_auth_useremail='${socket_auth_useremail}'`;

        const user = await pool.query(sqlQueryRequest);
        if (user.rows.length === 0) return response.status(400).json({message: 'Invalid email or password'});

        const validPassword = await bcrypt.compare(socket_auth_userpassword, user.rows[0].socket_auth_userpassword);
        if (!validPassword) return response.status(400).json({message: 'Invalid email or password!'});

        const token = jwt.sign({
            socket_auth_users_public_id: user.rows[0].socket_auth_users_public_id, 
            socket_auth_user_primary_privilages: user.rows[0].socket_auth_user_primary_privilages, 
            socket_auth_useremail: user.rows[0].socket_auth_useremail
        }, process.env.PRIVATE_KEY);
        
        response.status(201).json({token: token});
    };

};

module.exports = AuthController;