import { Router } from "express";
import usersRouter from "./user.route.js"
import loguinRouter from "./auth.route.js"
import companyRouter from "./company.route.js";
import datasRouter from "./datas.router.js";
import reportRouter from "./reports.router.js";
import engineRouter from "./engines.router.js";


const router = Router();
const prefijo = "app";

router.use(`/${prefijo}/user`, usersRouter)
router.use(`/${prefijo}/auth`, loguinRouter);
router.use(`/${prefijo}/company`, companyRouter);
router.use(`/${prefijo}/data`, datasRouter)
router.use(`/${prefijo}/report`, reportRouter)
router.use(`/${prefijo}/engine`, engineRouter)



export default router;
