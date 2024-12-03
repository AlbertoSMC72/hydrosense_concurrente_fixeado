import { getCompanyService, createCompanyService } from "../services/companys.service.js";

export const getCompanyController = async (req, res) => {
    const { email } = req.params;
    getCompanyService(email)
        .then((company) => res.status(200).json(company))
        .catch((error) => res.status(500).send(error.message));
}

export const postCompanyController = async (req, res) => {
    const company = req.body;
    createCompanyService(company)
        .then((company) => res.status(200).json(company))
        .catch((error) => res.status(500).send(error.message));
}
