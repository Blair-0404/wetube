// express import
import express from "express";// 바벨 테스트 위해서 ES6문법으로 express import

// middleware import
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import useRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

// Server 생성
const app = express() ;// 불러온 express를 실행해서 app생성

// CB

// middleWares (순서대로 진행되기 떄문에 순서중요)
app.use(cookieParser());
app.use(bodyParser.json()); // json 받으면 이해하기
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));

// global Router
app.use(routes.home, globalRouter)

// detail Routers
app.use(routes.users, useRouter); // app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.
app.use(routes.videos, videoRouter); // app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.

export default app;

