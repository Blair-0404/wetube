import express from "express"

export const useRouter = express.Router(); // express의 Router사용!
// app.js에서 사용할 수 있게 변수 선언과 동시에 바로 export 해주기

useRouter.get("/", (req, res) => res.send('user index'))
useRouter.get("/edit", (req, res) => res.send('user edit'))
useRouter.get("/password", (req, res) => res.send('user password'))

