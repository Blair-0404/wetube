// express import
import express from "express";// 바벨 테스트 위해서 ES6문법으로 express import
// middleware import
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import useRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import "./passport"


// Server 생성
const app = express() ;// 불러온 express를 실행해서 app생성

const CookieStore = MongoStore(session) //session Obj 필요함

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
app.use(session({ // express는 이 session을 이용해서 쿠키를 받을 수 있다.(session은 쿠키를 해독)
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: mongoose.connection // CookieStore를 DB에 연결
  })
})); // 이제 서버가 재 시작되도 유저는 여전히 로그인 상태가 유지된다.
app.use(passport.initialize()); // passport통해서 session이용
app.use(passport.session()); //  위에서 해독된 쿠키들이 이부분에서 passort로 넘어가게된다. (session이 가진 쿠키를 이용)
app.use(localsMiddleware);
// localsMiddleware 미들웨어에서 next()를 해줬기 때문에 아래 app.use가 이어서 실핼될 수 있다.

// global Router
app.use(routes.home, globalRouter);

// detail Routers
app.use(routes.users, useRouter); // app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.
app.use(routes.videos, videoRouter);


export default app;

