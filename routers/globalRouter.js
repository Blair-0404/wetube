import express from "express"
import routes from "../routes";

// controllers import
import { home, search } from "../controllers/videoController"
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userController"
import {onlyPublic} from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); //가입 후 로그인 유도

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPublic, logout);



export default globalRouter