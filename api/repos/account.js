const User = require('../models/user');

// MongoDB Repo

exports.account_find_user = async (email) => {
    try {
        let result = User.find({
                email: email
            });

        return result;
    } catch (err) {
        throw err;
    }
}

exports.account_store_user = async (user) => {
    try {
        return await user.save();
    } catch (err) {
        throw err;
    }
}