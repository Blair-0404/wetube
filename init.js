import "./db"
import app from "./app"; // app.js 에서 application import
import dotenv from "dotenv";
dotenv.config();  // dotenv.config함수로 .env파일 안에 있는 정보 불러오고 찾은 모든 변수들을 proccess.env.key에 저장하기

import "./models/Video"; // 생성한 모델을 Database가 인식하게 해주기위해서 import
import "./models/Comment";


const PORT = process.env.PORT || 4000; // 만일 key 못찾음 4000으로 !

const handleListening = () => console.log(`Listening on : http://localhost:${PORT} 블레어`);

app.listen(PORT, handleListening) // app을 해왔고 app.js에서 이미 express로 서버를 생성해 놨기 때문에 .listen 사용가능