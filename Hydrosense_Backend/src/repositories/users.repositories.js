import config from '../config/config.js';


export const getUsers = async (id_ref) => {
    try {
        const result = await config.query('SELECT * FROM users WHERE company_ref = ?', [id_ref]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUser = async (email) => {
    try {
        const result = await config.query('SELECT * FROM users WHERE email = ? limit 1', [email]);
        return result[0][0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createUser = async (user) => {
    try {
        const result = await config.query('INSERT INTO users SET ?', [user]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (email, user) => { 
    try {
        const oldInfo = getUser(email);
        if (!oldInfo) {
            throw new Error('User not found');
        }
        const updateInfo = { ...oldInfo, ...user };
        const result = await config.query('UPDATE users SET ? WHERE email = ?', [updateInfo, email]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUser = async (email) => { 
    try {
        const result = await config.query('DELETE FROM users WHERE email = ?', [email]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};
