import express from "express"
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController"


const useRouter = express.Router(); // express의 Router사용!
// app.js에서 사용할 수 있게 변수 선언과 동시에 바로 export 해주기


// useRouter.get(routes.users, users);
useRouter.get(routes.editProfile, editProfile);
useRouter.get(routes.changePassword, changePassword);
useRouter.get(routes.userDetail, userDetail);


export default useRouter