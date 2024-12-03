import { postEngineService, putEngineService, getEngineService } from "../services/engine.service.js";


export const getEngineController = async (req, res) => {
    getEngineService(req)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}

export const postEngineController = async (req, res) => {
    const engine  = req.body;
    postEngineService(engine)
        .then((req) => res.status(200).json(req))
        .catch((error) => res.status(500).send(error.message));
}

export const putEngineController = async (req, res) => {
    const { engine } = req.body;
    const { id } = req.params;
    putEngineService(engine, id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}