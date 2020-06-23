# wetube project
* wetube directory생성 후 IDE에서 작업

***

# < Setting >

## node.js 다운로드 
* npm 도 동시에 다운로드 된다.

## npm init -> package 생성하기 
* description, author만 typing 나머지는 enter => package.json파일이 생성된다.
<img src="./images/init.png" width="700" height="700" />
* 생성된 package.json에서 script일단 삭제


## express framework 다운받기 -> npm install express
* express는 nodejs를 편히 쓰게해주는 프레임워크이다. 즉 nodejs응 이용해 서버를 만드는 것 이다.
* npm에서 express검색애서 Readme 참고해보기
* npm을 사용할때는 꼭 package.json이 있는 폴더에서 실행해야 한다.
* npm install express 설치하면 node_modules 폴더가 생긴다.

## .gitignore
* 깃헙에 올리고 싶지 않은 것들을 담기
* 이미 push된 경우에는 git rm -r --cached . 후 다시 push

## git init

## github repository 생성 후 push
<img src="./images/repo.png" width="500" height="500" />

* repo생성 후 터미널에서 git remote add origin https://github.com/Blair-0404/wetube.git
* git add .    ->    git commit -m "first commit"    -> git push origin master


## gitflow 전략 도입
* master기반 -> develop기반 -> feature/blair/현재작업명  (이곳에서 작업 후 develop으로 pr 및 merge)
* feature/blair/작업명 브랜치는 해당작업이 끝나면 develop 에 merge시키고 삭제 후 새 작업명으로 다시 feature브랜치 생성하기

 ***
 
# < Server Express>
## express 사용해서 서버생성 
1. index.js에 express를 import
2. 불러온 express를 실행해서 app 생성함
3. 4000으로 Port번호 지정하고 app.listen 테스트
    * app이 4000포트를 listen하면 콜백함수 실행
```javascript
    // app.js

    const express = require('express') // express를 import
    // 즉 나의 폴더 어딘가에서 express를 찾는다. 없다면 node_modules에서 찾아서 불러온다.
    const app = express() // 불러온 express를 실행해서 app생성
    
    const PORT = 4000; // 열어줄 포트번호 지정
    
    function handleListening(){ // 콜백함수 생성
      console.log(`Listening on : http://localhost:${PORT}`)
    
    }
    
    app.listen(PORT, handleListening) 
    // 실행되면 터미널에 Listening on : http://localhost:4000 찍힌다.
```

## package.json 에 script 추가
```javascript
// package.json
    "scripts": {
    "start": "node app.js"
      }
```
* 이제 서버를 열떄 node index.js가 아닌 npm start 로 열 수 있다.

## GET api test
* 콜백함수 만들고 app.get(라우트,CB) 테스트 해봄 => 서버 켜진 상태에서 라우트 들어가면 CB실행된다.
* 웹사이트처럼 작동하려면 re.send에 메시지가 아닌 html,css,JS 등 파일이 전송되야한다.
    * 본 프젝에서 도전해볼 것 이다.
```javascript
    // app.js

    // CB 생성
    function handleHome(req, res) {
      res.send("Hello from home") // 브라우저에 뜨는 메세지
    
    }
    
    function handleProfile(req,res) {
      res.send("You are on my profile")
      // 웹사이트처럼 작동하려면 re.send에 메시지가 아닌 html,css,JS 등 파일이 전송되야한다.

    }

    // app.get 테스트
    app.get("/", handleHome);
    // 첫 인자로 라우트지정, 두번쨰 인자로 해당라우트 접속시 실행될 CB
    // 서버를 키고 브라우저에서 http://localhost:4000/로 접속하면 콜백함수가 실행된다.
    
    app.get("/profile", handleProfile);
```

## ES6 사용위해 BABEL 도입
### npm install @babel/node  ->  npm install @babel/preset-env
* ES6로 코딩하고싶지만 브라우저의 상황에 따라서 읽지 못할 수도있기때문에 바벨을 사용해서 안정화된 버전으로 낮춰주는 것 이다.
* Babel node 사용 => nodeJS에서 Babel을 사용할거라서
1. babel을 설치하고 .babelrc 파일생성 후 babel-preset-env plugin 설정해줌
    * .babelrc : babel plugin들을 모아놓고 사용할 설정파일
    
    ```javascript
   //.babelrc
   
   {
     "presets": ["@babel/preset-env"]
   }
   ```
2. index.js에서 erpress 를 ES6로 import 해보기 and 함수->arrow func
3. package.json에서 "start": "babel-node app.js" 로 변경 후 테스트 
    * 테스트 에러 -  npm install @babel/core 설치 후 다시 npm start 테스트
    
       ```javascript
      // package.json
      // start변경됨
      
        "scripts": {
          "start": "babel-node app.js"
        },
      
      ```
    
## nodemon package 설치  -> npm install nodemon -D
* 변경사항이 있을때마다 서버를 껏다 켜야해서 불편함을 느꼈다.
* nodemon이 있으면 변경사항이 바로 반영된다.
* 하지만 프로젝트 실행에 필요한것이 아므로 dependencies에 겹치지 않게 해야함
    * npm install nodemon -D (뒤에 -D를 부여해)
       ```javascript
      // package.json
      // 새로운 entryPoint 생성됨.
      
        "devDependencies": {
          "nodemon": "^2.0.4"
        }
      
      ```
    * start 변경해주기
    
      ```javascript
      // package.json
          
       "scripts": {
       "start": "nodemon --exec babel-node app.js"
       },
          
       ```
* 이제 새로 저장할 떄마다 저절로 서버가 재실행된다.

## 트러블슈팅1.
* 바벨이 변환을 완료할때까지 기다리는 시간이 부족해서 서버가 자동으로 실행되는게 2번씩 실행될때가 있었다.
* 바벨의 변환시간을 2초정도 기다려 주기위해 package.json - scripts 변경

  ```javascript
  // package.json
          
    "scripts": {
    "start": "nodemon --exec babel-node app.js --delay 2"
    },
   ```
  
## express - middleware
* express에서 모든 함수는 middleware가 될 수 있다.
* exspress에서 middleware란 유저와 마지막 응답사이에 존재하는 것이다..?
    * 말 그대로 중간에 존재하는 소프트 웨어
* 웹사이트에 접속 - index.js실행 - app이 라우트 존재하는지 살펴본다.
    * 라우트 찾으면 인자로 넣은 CB(응답을 실행하는)실행 하게되는데 라우트요청과 CB사이에 미들웨어가 실행된다.
    * test (유저의 home "/"요청과 handleHome 사이에 미들웨어 추가)
    
    ````javascript
  // app.js
  
  
  // CB
  const handleHome = (req, res) => res.send("Hello from home"); 
  
  // middleware CB
  const betweenHome = () => console.log("I'm between");
  
  // Routes
  app.get("/", betweenHome, handleHome);
  
  ````
    * 하지만 위 코드는 / 라우트로 갈 경우 터미널에 I'm between는 찍히지만 handleHome 는 실행되지않고 계속 로딩중이게 된다.
        * 브라우저로부터 온 요청을 계속 처리할지에 대해, 그 오쳥이 handleHome으로 처리될지 등의 권한을 주지 않았기 때문이다.
        * 즉 요청을 계속 처리할 권한을 줘야한다.
        
            ````javascript
          // app.js
          // next라는 key이용해서 다음 실행권한주기
          
         
          // CB 이게 마지막 함수이므로 next인자 필요없다.
          const handleHome = (req, res) => res.send("Hello from home");
          
          // middleware CB 즉 middleware CB함수에만 next인자가 들어간다.
          const betweenHome = (req,res,next) => {
            console.log("I'm between");
            next(); // 다음 함수를 실행하게 해줌
          };
          
          // Routes
          app.get("/", betweenHome, handleHome);
          
          ````
        * 즉 middleware CB함수에만 next인자가 들어간다. handleHome은 마지막 함수이므로 next인자가 필요없다.
        * 하지만 이 경우는 middleware를 "/'라우트에만 사용한 경우 
        * 전체적으로 사용하려면? (코드의 순서가 굉장히 중요하다)
        
        ````javascript
          // app.js
      
          // middlewares 위치중요
          app.use(betweenHome) // 미들웨어를 전체 라우트에 사용
          
          // Routes
          app.get("/", handleHome);
          app.get("/profile", handleProfile);
      
        ````
* 즉 middleware 는 코드 내 위치가 중요하다.

### middleware - Morgan 설치 후 사용해보기  ->  npm install morgan
* Morgan ? logging에 도움을 준다. 
* logging이란? 무슨일이 어디서 일어났는지 기록하는 것 이다.
* morgan은 몇가지 로깅옵션들이 있다.
* 설치 후 app.js 에 import morgan from "morgan"; 해주기 

#### morgan - tiny옵션 사용해보기
* 아래처럼 app.use 코딩해준 후 
````javascript

    // app.js
    
    // middlewares
    app.use(morgan("tiny"))

    // Routes
    app.get("/", handleHome);
    app.get("/profile", hndleProfile);
````
* npm start -> 브라우저에 http://localhost:4000/ or /profile 경로로 이동해주면 아래처럼 로깅정보가 찍힌다.
<img src="./images/tiny.png" />

#### morgan - combined옵션 사용해보기
* 어쩐종류 접속인지, 어떤 브라우저인지 등의 정보 표시
* 아래처럼 app.use 코딩해준 후 
````javascript

    // app.js
    
    // middlewares
    app.use(morgan("combined"))
  
    // Routes
    app.get("/", handleHome);
    app.get("/profile", hndleProfile);
````
* npm start -> 브라우저에 http://localhost:4000/ or /profile 경로로 이동해주면 아래처럼 로깅정보가 찍힌다.
<img src="./images/combined.png"/>

### middleware - helmet 설치 후 사용해보기  ->  npm install helmet
* 보안관련 미들웨어 
* 설치 후 app.js 에 import helmet from "morgan"; 해주기 
* index.js에서 미들웨어 위치에 app.use(helmet())추가

### middleware - body-parser 설치 후 사용해보기  ->  npm install body-parser
* body로부터 정보를 얻을 수 있게 해준다.
* 누군가가 form을 채워서 전송하게 된다면 그 form은 서버에 의해서 받아져야한 한다. 특정한 형태(옵션)로.
* form을 받았을 때 그 데이터를 갖고있는 requestObject에 접근할 수 있어야 하므로 body-parser 사용해야한다.
* 옵션을 정의해줘야 한다. (=> 서버가 유저로부터 받은 데이터를 이해하는 방법)
* 옵션들에 대해서 다 알아야 한다. 내 무엇을 전송하는지 알 수 있어야 하니까.
    * bodyParser.json
    * bodyParser.text
    * bodyParser.urlencoded
* 설치 후 app.js 에 import bodyParser from "body-parser"; 해주기 

    ````javascript
      // app.js
  
      // middlewares
  
      app.use(bodyParser.json()) // json 받으면 이해하기
      app.use(bodyParser.urlencoded({extended : true}))
  
    ````

### middleware - cookie-parser 설치 후 사용해보기  ->  npm install cookie-parser
* cookie를 다루는데 도와준다. 유저로부터 받은 cookie를 이해하는 방법
* session을 다루기 위해서 cookie에 유저정보를 저장한다.
* 설치 후 app.js 에 import cookieParser from "cookie-parser"; 해주기 


### middleware 가 연결을 끊게할 수도 있다.
* 원한다면 미들웨어로 연결을 끊을 수 있다.
* 미들웨어가 res.sent를 실행하는 함수를 발동하면 (next()가 있어도) 연결이 끊긴다.
````javascript
    // app.js
    
    // CB
    const handleHome = (req, res) => res.send("Hello from home"); // 브라우저에 뜨는 메세지

    // middlewares
    const middleware = (req, res, next) => {
      res.send("not happening");
      next()
    };
    
    // Routes
    app.get("/", middleware, handleHome);

````
* 즉 위 코드에서 handleHome 는 실행이 안된다.
<img src="./images/combined.png" />


## Routing

### ES6 module 사용 : 다른 파일끼리 코드를 가져다 사용할 수 있다.
* init.js생성 후 index.js -> app.js파일변경 후 app.js에서 불필요한 코드 부분 삭제
* app.js에 있는 Object를 init.js에 주려한다.
* ES6 module : 다른 파일끼리 코드를 가져다 사용할 수 있다.
    * app.js에서 express, helmet, morgan 등등의 모듈을 node_modules에서 가져와 사용했었다.
    * 이제 app.js를 init.js로 가져와 사용해보기 위해 app.js하단에 export 해주기
    ````javascript
     // app.js
    
     export default app;
     // 누군가가(=다른 파일이) app을 import하면 app Object를 주겠다는 의미.
     // app Object ? app.js 에 코딩한 모두를 의미
    ````
    * init.js 에도 app.js를 import해주고 test해보기
    ````javascript
     // init.js
        
     import app from "./app";
         
     const PORT = 4000;
         
     const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);
         
     app.listen(PORT, handleListening) // app을 해왔고 app.js에서 이미 express로 서버를 생성해 놨기 때문에 .listen 사용가능
    ````
    * package.json - scripts nodemon init.js가 시작되게 변경
    ````javascript
     // package.json
  
      "scripts": {
        "start": "nodemon --exec babel-node init.js --delay 2"
      },
    ````
### express - Router 사용
* router란 route들의 복잡함을 쪼개주는데 사용할 수 있다.
* userRouter.js 파일 생성
    ````javascript
    // userRouter.js
  
    import express from "express"
    
    export const useRouter = express.Router(); // express의 Router사용!
    // app.js에서 사용할 수 있게 변수 선언과 동시에 바로 export 해주기
    
    useRouter.get("/", (req, res) => res.send('user index'))
    useRouter.get("/edit", (req, res) => res.send('user edit'))
    useRouter.get("/password", (req, res) => res.send('user password'))
   
    ````
* app.js에서 import해서 사용하기
    ````javascript
    // app.js
  
    import { useRouter } from "./userRouter"; // export default 를 하지않았어서  { }로 import 함
    
    app.use("/user", useRouter)
    // app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.

    ````
* 실행 후 브라우저에서 /user 로 접속한 결과
<img src="./images/user.png" />
<img src="./images/user:edit.png" />
<img src="./images/user:password.png" />


### export const 변수명 VS export default 변수명
* 위 두개의 차이점은 뭘까?
    * export const 변수명 (= 해당 변수만 export)
        * 변수를 생성함과 동시에 바로 export를 해주는 방식
        * 이러한 경우에는 import를 하는 쪽에서 import { 변수명 } from "경로" 즉 { } 로 import를 해줘야 한다.
        * 해당 변수만 export하기 떄문에 export하는 파일쪽에 다른 변수들이있다면 그것은 export 되지 않는다.
    * export default 변수명 (= 파일 전체를 export)
        * 위에서 변수를 생성하고 마지막 부분에 export default를 해주는 방식
        * 이러한 경우에는 import를 하는 쪽에서 import 변수명 from "경로" 로 import를 해줘야 한다.
        * 전체를 export하기 떄문에 파일 내의 어떤 것도 import 받은 쪽에서 사용가능

## MVC(= Model View Control) Pattern
* Model - data(DB - 뒤에서 다룰 예정)
* View - data가 어떻게 생겼는지?
* Controller - 데이터를 찾는 함수

### MVC 1 - Routers 분리
* 설치하는게 아니라 단지 패턴일 뿐이다. 본 프로젝트에 적용 도전!
    * 데이터의 모습에 맞춰서 url과 함수를 분리할 것 이다.
    * 라우터들을 기능에 따라서 분리 
        1. app.js 에서 삭제가 필요한 부분 삭헤하고 router.js -> useRouter.js 파일명 변경
        2. videoRouter.js, globalRouter.js 파일 새로 생성
        3. routers directory생성 후 useRouter.js, videoRouter.js, globalRouter.js 담기
        4. app.js에서 생성된 router들 import
            ````javascript
           // routers/videoRouter.js
           import express from "express"
           
           const videoRouter = express.Router();
           
           export default videoRouter
           
           // routers/globalRouter.js
           import express from "express"
           
           const globalRouter = express.Router();
           
           export default globalRouter   
            ````
           
            ````javascript
           // app.js
           import useRouter from "./routers/userRouter";
           import videoRouter from "./routers/videoRouter";
           import globalRouter from "./routers/globalRouter";
        
           app.use("/", globalRouter);
           app.use("/users", useRouter); // app.use => 누군가가 /user 경로에 접근하면 useRouter의 라우터전체를 사용하겠다는 의미이다.
           app.use("/videos", videoRouter); 
           
            ````

### MVC 2 - URL 생성
* router.js 파일 생성 후 모든 URL 생성
````javascript
// routes.js
//여기에 URL들을 생성해서 어디에서든 이 URL을 불러다 쓸 예정(이유는 나중에,,)

// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";


const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail:USER_DETAIL,
  editProfile:EDIT_PROFILE,
  changePassword:CHANGE_PASSWORD,
  videos:VIDEOS,
  upload:UPLOAD,
  videoDetail:VIDEO_DETAIL,
  editVideo:EDIT_VIDEO,
  deleteVideo:DELETE_VIDEO
};

export default routes;
````
* app.js에도 url을 직접 써줬던 부분을 변경해주기
````javascript
// app.js
import routes from "./routes";

// global Router
app.use(routes.home, globalRouter)

// detail Routers
app.use(routes.users, useRouter);
app.use(routes.videos, videoRouter);

````
* routers/globalRouter.js와 routers/userRouter.js 와 routers/videoRouter.js 에서 필요한 URL들 받기
````javascript
// routers/globalRouter.js

import express from "express"
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => res.send("Home"));
globalRouter.get(routes.join, (req, res) => res.send("Join"));
globalRouter.get(routes.login, (req, res) => res.send("Login"));
globalRouter.get(routes.logout, (req, res) => res.send("Logout"));
globalRouter.get(routes.search, (req, res) => res.send("Search"));

export default globalRouter


// routers/userRouter.js

import express from "express"
import routes from "../routes";

const useRouter = express.Router(); // express의 Router사용!

useRouter.get(routes.users, (req, res) => res.send("users"));
useRouter.get(routes.userDetail, (req, res) => res.send("userDetail"));
useRouter.get(routes.editProfile, (req, res) => res.send("editProfile"));
useRouter.get(routes.changePassword, (req, res) => res.send("changePassword"));


export default useRouter


// routers/videoRouter.js

import express from "express"
import routes from "../routes";

const videoRouter = express.Router();


videoRouter.get(routes.videos, (req, res) => res.send("videos"));
videoRouter.get(routes.upload, (req, res) => res.send("upload"));
videoRouter.get(routes.videoDetail, (req, res) => res.send("videoDetail"));
videoRouter.get(routes.editVideo, (req, res) => res.send("editVideo"));
videoRouter.get(routes.deleteVideo, (req, res) => res.send("deleteVideo"));

export default videoRouter
````

### MVC 3 - Controller (= 콜백함수 분리하기)
#### Controller먼저 한 후 뒤에 View->Model순으로 패턴 진행할 예정
* Controller는 어떤 일이 어떻게 발생하는지에 관한 로직이다.
* 대게 프로젝트에 있는 각 모델마다 컨트롤러 생성하는 편이다.
* 본 프젝에서는 video와 video를 업로드할 user 등의 모델이 필요(routes.js에 있는것들)
    * routers폴더에 있는 router파일들의 모든 콜백함수들을 Controller에 담을 것 이다.
    1. controllers폴더 생성 후 videoController.js, userController.js 생성할 것이다.
    2. test로 globalRouter.js에 있던 콜백함수들을 videoController.js, userController.js로 옮기고 import해보기
    ````javascript
    // controllers/videoController.js
    
    export const home = (req, res) => res.send("Home");
    export const search = (req, res) => res.send("Search");
    
    export const videos = (req, res) => res.send("videos");
    export const upload = (req, res) => res.send("upload");
    export const videoDetail = (req, res) => res.send("videoDetail");
    export const editVideo = (req, res) => res.send("editVideo");
    export const deleteVideo = (req, res) => res.send("deleteVideo");
  
  
    // routers/videoRouters.js
  
    import express from "express"
    import routes from "../routes";
    import { videos, upload, videoDetail, editVideo, deleteVideo } from "../controllers/videoController"
    
    const videoRouter = express.Router();
    
    videoRouter.get(routes.videos, videos);
    videoRouter.get(routes.upload, upload);
    videoRouter.get(routes.videoDetail, videoDetail);
    videoRouter.get(routes.editVideo, editVideo);
    videoRouter.get(routes.deleteVideo, deleteVideo);
    
    export default videoRouter
    
    ````
  
    ````javascript
    // controllers/useController.js
  
    export const join = (req, res) => res.send("Join");
    export const login = (req, res) => res.send("Login");
    export const logout = (req, res) => res.send("Logout");
  
    export const users = (req, res) => res.send("users");
    export const userDetail = (req, res) => res.send("userDetail");
    export const editProfile = (req, res) => res.send("editProfile");
    export const changePassword = (req, res) => res.send("changePassword");
  
    // routers/useRouters.js
  
    import express from "express"
    import routes from "../routes";
    import { users, userDetail, editProfile, changePassword } from "../controllers/userController"
    
    
    const useRouter = express.Router(); // express의 Router사용!
    // app.js에서 사용할 수 있게 변수 선언과 동시에 바로 export 해주기
    
    
    useRouter.get(routes.users, users);
    useRouter.get(routes.userDetail, userDetail);
    useRouter.get(routes.editProfile, editProfile);
    useRouter.get(routes.changePassword, changePassword);
    
    
    export default useRouter
    ````
  
    ````javascript
    // routers/globalRouter.js
  
    import express from "express"
    import routes from "../routes";
  
    // controllers import
    import { home, search } from "../controllers/videoController"
    import { join, login, logout } from "../controllers/userController"

    
    const globalRouter = express.Router();
    
    globalRouter.get(routes.home, home);
    globalRouter.get(routes.search, search);
    globalRouter.get(routes.join, join);
    globalRouter.get(routes.login, login);
    globalRouter.get(routes.logout, logout);
    
    export default globalRouter
    ````
* 나중에는 콜백함수의 로직에서 데이터를 가져오거나 에러를 처리하는 등의 복잡한 로직을 구현해야할 수 있기때문에 controller를 따로 분리하는것은 좋다.

   
### MVC 4 - View - Pug -> npm install Pug
* Pug는  템플릿 언어로 express의 view engine이다. (express에서 view를 다루는 방식 중 하나)
* pug는 HTML을 세련되게 보이게 할 수도 있다는게 장점이고 직접 템플릿을 작성하는 것 보다 프로그래밍을 더 빠르게 할 수 있다.
* express로 HTML을 보여줄 수 있다. res.sent()대신 실제 HTML을 전달가능하고 CSS로 꾸밀수도 있다.
#### Pug 사용 test
* npm install Pug 설치 후 공식문서 사용법참고
    * app.set()으로 application 설정 하기 -> 본프젝에서는 view engine을 변경할 것이다(기본값은 undefined)
    ````javascript
    // app.js
    app.set('view engine', "pug") // view engine을 변경할것이다. 확장자명을 pug로 설정

    ````
    * Pug와 express에는 view파일들의 위치에 관한 기본설정이 있는데 바꾸고싶다면 'views'설정을 바꾸면된다.
        * application의 화면이 담긴 디렉토리나 디렉퇴의 배열 입력하면 된다.
        * html파일을 저장해야 하는 폴더의 기본값은 => 프로젝트의 작업 디렉토리 + '/views' 이다.
    * views 폴더 생 후 내부에 home.pug 확장자로 파일생성 
    ````javascript
    // views/home.pug 
    // html처럼 변환해준다.
  
    p Hello PUGPUG

    ````
    
    * 브라우저에서 home 라우트 접속시 pug파일의 내부가 보이기
    ````javascript
    // videoController.js
    export const home = (req, res) => res.render("home"); // 확장자가 pug인 파일명을 render의 인자로

    ...
    ...
    ... 
    // 나머지 controller파일들도 send->render로 변경해줌
    ````
  <img src="./images/pug.png" />
#### Pug Layouts 작업
* pug의 문법은 <>를 사용 않고 들여쓰기를 한다.
* views폴더에 layouts폴더 생성 후 내부에 main.pug 파일 생성해서 layout 코딩하기
    * layout은 모든 템플릿파일에서 같은 코드를 반복해주지 않기 위해서 꼭 필요하다.
    * layout에 공통적인 부분을 코딩하고 다른 파일마다는 필요한 내용들만 넣기
    ````javascript
    // views/layouts/main.pug
    
    doctype html
    html
        head
            title WeTube
        body
            header
                h1 @WeTube@
            main
                block content // content 부분에 각 템플릿들(.pug파일들)에 들어간다.
            fotter
                span &copy; WeTube
    ````
 
* 템플릿에서 레이아웃 확장시키기
    ````javascript
    // views/home.pug
  
    extends layouts/main // 레이아웃 코드들을 템플릿에서 사용하고(복붙) + 추가적인 것도 더하겠다는 의미
    
    block content
        p Hello PUGPUG
  
    ...
    ...
    ...
    // 나머지 템플릿파일들도 모두 생성해줌
    ````
  <img src="./images/pugHome.png" />

#### Pug Partials 작업(조직화)
* 프로그래밍은 분할정복이다.(하나씩 나눠가면서 처리해야함)
* views/partial 폴더 생성
    * views/partial/footer.pug 생성
    ````javascript
    // views/partial/footer.pug
  
    footer.footer
        .footer__icon
            i.fab.fa-youtube
        span.footer__text WeTube #{new Date().getFullYear()} &copy;
  
    ````
  
    * views/partial/header.pug 생성
    ````javascript
    // views/partial/header.pug
  
    header.header
        .header__column
            i.fab.fa-youtube
        .header__column
            ul
                li
                    a(href="#") Join 듯
                    // routes.js에서 만든 URL과 연결할 예정
                li
                    a(href="#") Log In
  
    ````
* partial 파일에 작업 후 layouts 파일 변경
    ````javascript
    // views/layouts/main.pug
    
    doctype html
    html
        head
            title WeTube
        body
            include ../partials/header // 변경
            main
                block content // content 부분에 각 템플릿들(.pug파일들)에 들어간다.
            include ../partials/footer // 변경
    ````

#### Pug - Templates 에 Controller 정보 추가
* 템플릿 전체에 or 한개에 추가가능
#### Pug - Templates 에 Controller 정보 추가 - 템플릿 전체에 추가하는 방법(locals사용)
* locals를 이용해템플릿 전체에 추가하는 방법
    * 미들웨어 생성 : routes.js의 local변수를 global변수로 사용하기 위해
        * middlewares.js 파일생성(미들웨어 함수는 모두 여기에)
    ````javascript
    // middlewares.js  
  
    export const localsMiddleware = (req, res, next) => {
      res.locals.siteName = 'WeTube';
      res.locals.routes = routes;
      next();
    };
  
    ````
  
    ````javascript
    // app.js
  
    import { localsMiddleware } from "./middlewares"
    ...
    // middleWares (순서대로 진행되기 떄문에 순서중요)
    ...
    // 미들웨어실행의 가장 마지막 순서에 넣기!
    app.use(localsMiddleware); // pug - 템플릿에서 routes.js 접근하기
    ````
  
    ````javascript
    // views/layouts/main.pug
    // test
    
    doctype html
    html
        head
            link(rel="stylesheet", href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU", crossorigin="anonymous")
            title #{siteName} // 이부분!!!
                              // locals에 있는건 템플릿에서 변수명처럼 존재한다.
        body
            include ../partials/header
            main
                block content
            include ../partials/footer
 
    ````
    ````javascript
    // views/partials/header.pug

    header.header
        .header__column
            i.fab.fa-youtube
        .header__column
            ul
                li
                    a(href=routes.join) Join // 라우트파일의 변수명에 이제 접근가능
                li
                    a(href=routes.login) Log In // 이제 클릭하면 url 변경된다.
    
    ````
    <img src="./images/locals.png" />
..

#### Pug - Templates 에 Controller 정보 추가 - 템플릿마다 정보듣 다르게 추가하는 방법
* Controller내부의 함수 자체에 인자를 설정함으로써 템플릿에 변수를 전달하는 방법이다.
    * res.render(연결할 템플릿.pug, 템플릿에 추가할 정보가 담긴 객체)
    * 즉 원하는 변수(객체)를 controller에서 템플릿에 직접전달
    * 템플릿마다 보여줘야하는 결과가 다를경우 이 방법 유용( 본 프젝에서는 거의 이 방법으로 정보를 추가할 것이다,)
   
````javascript
// controllers/videoController.js

export const home = (req, res) => res.render("home", { pageTitle: "Home" }); // 첫인자 템플릿, 두번쨰인자 템플릿에 추가할 정보가 담긴객체
// 즉 pageTitle이 "home" 으로 전달됨
export const search = (req, res) => res.render("Search", { pageTitle: "Search" });

export const videos = (req, res) => res.render("videos");
export const upload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DeleteVideo" });

````

````javascript
// views/layouts/main.pug

doctype html
html
    head
        link(rel="stylesheet", href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU", crossorigin="anonymous")
        title #{pageTitle}  |  #{siteName}  
             //  #{pageTitle} 추가해주면 controller에서 설정한 템플릿마다 객체의 값이 다르므로 결과가 다르다.
    body
        include ../partials/header
        main
            block content
        include ../partials/footer

````

### Search Controller
* 검색창에 키워드 입력시 라우트 변경, 키워트담은 화면 새로 그려짐

#### [Pug Pages Plan]
 - [ ] Home
 - [x] Join -> [commit Log](https://github.com/Blair-0404/wetube/commit/73839fcb25032ce002e52f49c5b1128e80a97615)
 - [x] Login -> [commit Log](https://github.com/Blair-0404/wetube/commit/73839fcb25032ce002e52f49c5b1128e80a97615)
 - [x] Search -> [commit Log](https://github.com/Blair-0404/wetube/commit/73839fcb25032ce002e52f49c5b1128e80a97615)
 - [ ] User Detail
 - [x] Edit Profile -> [commit Log](https://github.com/Blair-0404/wetube/commit/ac727c3309649afdbd929ed747eeac7246de565d)
 - [x] Change Password
 - [x] Upload
 - [x] Edit Video

# < Server MongoDB >
