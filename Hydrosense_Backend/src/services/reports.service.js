import { postReport } from "../repositories/reports.repositories.js";

export const postReportService = async (req) => {
    try {
        //logica para el servidor en tiempo real
        return await postReport(req.body);
    } catch (error) {
        throw error;
    }
}