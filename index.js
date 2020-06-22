const express = require('express') // express를 import
// 즉 나의 폴더 어딘가에서 express를 찾는다. 없다면 node_modules에서 찾아서 불러온다.
const app = express() // 불러온 express를 실행해서 app생성

const PORT = 4000; // 열어줄 포트번호 지정

function handleListening(){ // 콜백함수 생성
  console.log(`Listening on : http://localhost:${PORT}`)

}

function handleHome() {
  console.log('hi from home!!')
}

app.listen(PORT, handleListening)
// 실행되면 터미널에 Listening on : http://localhost:4000 찍히고
// 브라우저에서 http://localhost:4000 접속이 가능해진다.

app.get("/", handleHome);
// 서버를 키고 브라우저에서 http://localhost:4000/로 접속하면 콜백함수가 실행된다.