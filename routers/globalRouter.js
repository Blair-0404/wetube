import express from "express";
import passport from "passport";
import routes from "../routes";

// controllers import
import {home, search} from "../controllers/videoController"
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  postGithubLogIn
} from "../controllers/userController"
import {onlyPublic, onlyPrivate} from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); //가입 후 로그인 유도

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin); // 1. 사용자가 깃허브 버튼누르면 깃헙으로 가는 부분 라우터처리

globalRouter.get( // 4 사용자가 돌아오면서 실행되는 부분
  routes.githubCallback,
  passport.authenticate("github", {failureRedirect: "/login"}),
  postGithubLogIn // 로그인 잘되면 실행
);

export default globalRouter