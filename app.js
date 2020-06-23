// express import
import express from "express";// 바벨 테스트 위해서 ES6문법으로 express import

// middleware import
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { useRouter } from "./router"; // export default 를 하지않았어서  { }로 import 함

// Server 생성
const app = express() ;// 불러온 express를 실행해서 app생성

// CB
const handleHome = (req, res) => res.send("Hello from home"); // 브라우저에 뜨는 메세지
const handleProfile = (req,res) => res.send("You are on my profile");
// 웹사이트처럼 작동하려면 re.send에 메시지가 아닌 html,css,JS 등 파일이 전송되야한다.

// middlewares (순서대로 진행되기 떄문에 순서중요)
app.use(cookieParser());
app.use(bodyParser.json()); // json 받으면 이해하기
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", handleHome);
// 첫 인자로 라우트지정, 두번쨰 인자로 해당라우트 접속시 실행될 CB
// 서버를 키고 브라우저에서 http://localhost:4000/로 접속하면 콜백함수가 실행된다.
app.get("/profile", handleProfile);

app.use("/user", useRouter)
// app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.

export default app;

