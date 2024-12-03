import { getCompanyController,postCompanyController } from "../controllers/companys.controller.js";
import { Router } from 'express';

const companyRouter = Router();

companyRouter.get('/:email', getCompanyController);
companyRouter.post('/', postCompanyController);

export default companyRouter;