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
import { localsMiddleware } from "./middlewares";


// Server 생성
const app = express() ;// 불러온 express를 실행해서 app생성


// middleWares (순서대로 진행되기 떄문에 순서중요)
app.use(helmet());
app.set('view engine', "pug");
app.use("/uploads", express.static("uploads")) // 누군가가 /uploads로 간다면 express.static(directory명)을 이용
app.use("/static", express.static("static")) // 누군가가 /uploads로 간다면 express.static(directory명)을 이용
// express.static() 은 directory에서 file을 보내주는 middleware func이다.
app.use(cookieParser());
app.use(bodyParser.json()); // json 받으면 이해하기
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use(localsMiddleware);
// localsMiddleware 미들웨어에서 next()를 해줬기 때문에 아래 app.use가 이어서 실핼될 수 있다.

// global Router
app.use(routes.home, globalRouter);

// detail Routers
app.use(routes.users, useRouter); // app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.
app.use(routes.videos, videoRouter);


export default app;

