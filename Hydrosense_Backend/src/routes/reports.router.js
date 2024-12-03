import { postReportController } from "../controllers/reports.controller.js";
import { Router } from "express";

const reportRouter = Router();

reportRouter.post('/', postReportController);

export default reportRouter;