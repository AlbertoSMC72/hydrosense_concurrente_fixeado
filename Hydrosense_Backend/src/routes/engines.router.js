import { postEngineController, putEngineController, getEngineController } from "../controllers/engine.controller.js";

import { Router } from "express";

const engineRouter = Router();
engineRouter.get('/:id', getEngineController);
engineRouter.post('/', postEngineController);
engineRouter.put('/:id', putEngineController);

export default engineRouter;