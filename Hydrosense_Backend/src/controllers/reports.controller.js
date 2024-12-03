import { postReportService } from "../services/reports.service.js";

export const postReportController = async (req, res) => {
    postReportService(req)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send(error.message));
}

