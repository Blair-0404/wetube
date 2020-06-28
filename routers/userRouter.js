import express from "express"
import routes from "../routes";
import { userDetail, editProfile, changePassword } from "../controllers/userController"
import {onlyPrivate} from "../middlewares";


const useRouter = express.Router(); // express의 Router사용!
// app.js에서 사용할 수 있게 변수 선언과 동시에 바로 export 해주기


useRouter.get(routes.editProfile, onlyPrivate, editProfile);
useRouter.get(routes.changePassword, onlyPrivate, changePassword);
useRouter.get(routes.userDetail(), userDetail);


export default useRouter