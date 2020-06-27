import express from "express"
import routes from "../routes";

// controllers import
import { home, search } from "../controllers/videoController"
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userController"

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin); //가입 후 로그인 유도

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, logout);



export default globalRouter