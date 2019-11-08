require('../models/UserProfile')();
const pool = require('../database/ConnectionString');
const {validateUserProfile, validateUserProfileUpdate} = require('../validations/UserProfilerofileValidation');

class UserProfileController {

    static async createUserProfile(request, response) {
        const {error} = validateUserProfile(request.body);
        if (error) return response.status(400).json({message: error.details[0].message});

        const {socket_auth_users_public_id, socket_auth_user_first_name, socket_auth_user_middle_name, socket_auth_user_last_name, socket_auth_user_country, socket_auth_user_state, socket_auth_user_precise_location, socket_auth_user_contact} = request.body;

        const sqlPostRequest = `INSERT INTO user_profile(socket_auth_users_public_id, socket_auth_user_first_name, socket_auth_user_middle_name, socket_auth_user_last_name, socket_auth_user_country, socket_auth_user_state, socket_auth_user_precise_location, socket_auth_user_contact) VALUES('${socket_auth_users_public_id}', '${socket_auth_user_first_name}', '${socket_auth_user_middle_name}', '${socket_auth_user_last_name}', '${socket_auth_user_country}', '${socket_auth_user_state}', '${socket_auth_user_precise_location}', '${socket_auth_user_contact}')`;
    
        await pool.query(sqlPostRequest);
        return response.status(200).json({ message: 'Profile created succesfuly'});
    };

    static async updateUserProfile(request, response) {
        const {error} = validateUserProfileUpdate(request.body);
        if (error) return response.status(400).json({message: error.details[0].message});
        
        const socket_auth_users_public_id = request.params.id;
        const {socket_auth_user_first_name, socket_auth_user_middle_name, socket_auth_user_last_name, socket_auth_user_country, socket_auth_user_state, socket_auth_user_precise_location, socket_auth_user_contact} = request.body;
        const sqlUpdateRequest = `UPDATE user_profile SET socket_auth_user_first_name='${socket_auth_user_first_name}', socket_auth_user_middle_name='${socket_auth_user_middle_name}', socket_auth_user_last_name='${socket_auth_user_last_name}', socket_auth_user_country='${socket_auth_user_country}', socket_auth_user_state='${socket_auth_user_state}', socket_auth_user_precise_location='${socket_auth_user_precise_location}', socket_auth_user_contact='${socket_auth_user_contact}' WHERE socket_auth_users_public_id='${socket_auth_users_public_id}'`;

        await pool.query(sqlUpdateRequest);
        return response.status(200).json({ message: 'Profile updated succesfuly'});
    }

}; 

module.exports = UserProfileController;