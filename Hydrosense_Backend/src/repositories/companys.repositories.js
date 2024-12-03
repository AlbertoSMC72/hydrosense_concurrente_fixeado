import config from "../config/config.js";

export const getCompany = async (email) => {
    try {
        const result = await config.query('SELECT * FROM companys WHERE email = ? limit 1', [email]);
        return result[0][0];
    } catch (error) {
        throw new Error(error.message);
    }
}   

export const createCompany = async (company) => {
    try {
        console.log(company);
        const result = await config.query('INSERT INTO companys SET ?', [company]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

