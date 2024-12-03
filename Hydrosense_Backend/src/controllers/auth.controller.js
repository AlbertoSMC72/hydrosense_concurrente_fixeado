import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserService } from '../services/users.service.js';
import { getCompanyService } from '../services/companys.service.js';

const secretJWT = process.env.SECRET_JWT || "eNbnClWA~c$~DI7X8fJ";

export const login = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await getUserService(email);
    const companyFound = await getCompanyService(email);

    if (!userFound && !companyFound) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    const userPassword = userFound ? userFound.password : null;
    const companyPassword = companyFound ? companyFound.password : null;

    let isCorrectPass = false;

    if (userPassword) {
        isCorrectPass = bcrypt.compareSync(password, userPassword);
    } else if (companyPassword) {
        isCorrectPass = bcrypt.compareSync(password, companyPassword);
    }

    if (!isCorrectPass) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    if (userFound) {
        const payload = {
            user: {
                id_user: userFound.id_user
            }
        }
        const token = jwt.sign(payload, secretJWT, { expiresIn: '3h' });
        return res.status(200).json({
            user: {
                name: userFound.name,
                email: userFound.email,
                id_company: userFound.company_ref
            },
            token: token,
            rol: userFound.position
        });
    } else {
        const payload = {
            company: {
                id_company: companyFound.id_company
            }
        }
        const token = jwt.sign(payload, secretJWT, { expiresIn: '3h' });
        return res.status(200).json({
            company: {
                id_company: companyFound.id_company,
                name: companyFound.name,
                email: companyFound.email
            },
            token: token,
            rol: "Admin"
        });
    }
}
