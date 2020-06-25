import "./db"
import app from "./app"; // app.js 에서 application import

const PORT = 4000;

const handleListening = () => console.log(`Listening on : http://localhost:${PORT} 블레어`);

app.listen(PORT, handleListening) // app을 해왔고 app.js에서 이미 express로 서버를 생성해 놨기 때문에 .listen 사용가능