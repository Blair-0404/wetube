import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config() // dotenv.config함수로 .env파일 안에 있는 정보 불러오기
// 찾은 모든 변수들을 proccess.env.key에 저장하기


mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true, useFindAndModify: false
  }
); // 어디에 DB가 저장되어있는지 알려줘야한다. so DB의 URL이 들어가야함

const db = mongoose.connection;// MongoDB와의 연결을 'db'로 저장

const handleOpen = () => console.log("Connected to DB !!")
const handleError = (error) => console.log(`Error on DB Connection!! ${error}`)

db.once("open", handleOpen)// connetion을 열고 성공여부를 확인할 수 있는 함수 넣기
// once는 한번실행
db.on("error", handleError)