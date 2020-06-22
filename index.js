import express from "express"// 바벨 테스트 위해서 ES6문법으로 express import

// const express = require('express') // express를 import
// 즉 나의 폴더 어딘가에서 express를 찾는다. 없다면 node_modules에서 찾아서 불러온다.
const app = express() // 불러온 express를 실행해서 app생성
const PORT = 4000; // 열어줄 포트번호 지정

// CB
const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`); // 브라우저에 뜨는 메세지
const handleHome = (req, res) => res.send("Hello from home"); // 브라우저에 뜨는 메세지
const handleProfile = (req,res) => res.send("You are on my profile");
// 웹사이트처럼 작동하려면 re.send에 메시지가 아닌 html,css,JS 등 파일이 전송되야한다,


app.listen(PORT, handleListening);
// 실행되면 터미널에 Listening on : http://localhost:4000 찍히고
// 브라우저에서 http://localhost:4000 접속이 가능해진다.


// Routes

app.get("/", handleHome);
// 첫 인자로 라우트지정, 두번쨰 인자로 해당라우트 접속시 실행될 CB
// 서버를 키고 브라우저에서 http://localhost:4000/로 접속하면 콜백함수가 실행된다.

app.get("/profile", handleProfile);
