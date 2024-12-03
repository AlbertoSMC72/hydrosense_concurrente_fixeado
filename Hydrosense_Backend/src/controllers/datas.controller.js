import { postDataService , getDataService, getDataByDateService, getLastDataService} from "../services/datas.service.js";

export const postDataController = async (req, res) => {
    postDataService(req)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}

export const getDataController = async (req, res) => {
    getDataService(req)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}

export const getDataByDateController = async (req, res) => {
    getDataByDateService(req)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}

export const getLastDataController = async (req, res) => {
    getLastDataService(req)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}