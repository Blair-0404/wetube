import express from "express"
import routes from "../routes";

const useRouter = express.Router(); // express의 Router사용!
// app.js에서 사용할 수 있게 변수 선언과 동시에 바로 export 해주기


useRouter.get(routes.users, (req, res) => res.send("users"));
useRouter.get(routes.userDetail, (req, res) => res.send("userDetail"));
useRouter.get(routes.editProfile, (req, res) => res.send("editProfile"));
useRouter.get(routes.changePassword, (req, res) => res.send("changePassword"));


export default useRouter