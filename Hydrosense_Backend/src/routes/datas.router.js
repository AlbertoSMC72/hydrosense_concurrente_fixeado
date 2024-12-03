import { Router } from "express";
import { postDataController, getDataController, getDataByDateController, getLastDataController} from "../controllers/datas.controller.js";

const datasRouter = Router();

datasRouter.get('/:id', getDataController);
datasRouter.get('/date/:id', getDataByDateController);
datasRouter.get('/last/:id', getLastDataController);
datasRouter.post('/', postDataController);

export default datasRouter;