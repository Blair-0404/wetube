import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/we-tube", {
  useNewUrlParser: true, useFindAndModify: false
}); // 어디에 DB가 저장되어있는지 알려줘야한다. so DB의 URL이 들어가야함

const db = mongoose.connection;// MongoDB와의 연결을 'db'로 저장

const handleOpen = () => console.log("Connected to DB !!")
const handleError = (error) => console.log(`Error on DB Connection!! ${error}`)

db.once("open", handleOpen)// connetion을 열고 성공여부를 확인할 수 있는 함수 넣기
// once는 한번실행
db.on("error", handleError)