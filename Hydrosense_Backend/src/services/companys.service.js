import { getCompany, createCompany } from "../repositories/companys.repositories.js";
import { validateCompany } from "../models/companys.model.js";
import bcrypt from 'bcrypt';
const saltRounds = parseInt(process.env.SALT_ROUNDS_BCRYPT);

export const getCompanyService = async (email) => {
    try {
        const company = await getCompany(email);
        return company;
    }
    catch (error) {
        throw error;
    }
}

export const createCompanyService = async (company) => {
    try {
        const validateCompanyResult = validateCompany(company)
        if (validateCompanyResult.success) {
            let { password } = company;
            password = bcrypt.hashSync(password, saltRounds);
            const companyRes = await createCompany({ ...company, password });
            return {message: "Company created successfully",status: 200};
        }
        else {
            throw new Error(validateCompanyResult.error.message)
        }
    }
    catch (error) {
        throw error;
    }
}