import { createData, obtenerDatosMotor, obtenerDatosMotorByDate, obtenerDatosMotorLast } from "../repositories/datas.repositories.js";
import { validateData } from "../models/datas.model.js";

export const postDataService = async (req) => {
    try {
        const data = validateData(req.body);
        if (!data.success) {
            const dataRes = await createData(req.body);
            return dataRes;
        } else {
            throw new Error(data.error.message);
        }
    } catch (error) {
        throw error;
    }
};

export const getDataService = async (req) => {
    try {
            const dataRes = await obtenerDatosMotor(req);
            return dataRes;
    } catch (error) {
        throw error;
    }
}   

export const getDataByDateService = async (req) => {
    try {
            const dataRes = await obtenerDatosMotorByDate(req);
            return dataRes;
    } catch (error) {
        throw error;
    }
}


export const getLastDataService = async (req) => {
    try {
            const dataRes = await obtenerDatosMotorLast(req);
            return dataRes;
    } catch (error) {
        throw error;
    }
}