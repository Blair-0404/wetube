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
 
# < Server >
## express 사용해서 서버생성 
1. index.js에 express를 import
2. 불러온 express를 실행해서 app 생성함
3. 4000으로 Port번호 지정하고 app.listen 테스트
    * app이 4000포트를 listen하면 콜백함수 실행
```javascript
    // index.js

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
    "start": "node index.js"
      }
```
* 이제 서버를 열떄 node index.js가 아닌 npm start 로 열 수 있다.

## GET api test
* 콜백함수 만들고 app.get(라우트,CB) 테스트 해봄 => 서버 켜진 상태에서 라우트 들어가면 CB실행된다.
* 웹사이트처럼 작동하려면 re.send에 메시지가 아닌 html,css,JS 등 파일이 전송되야한다.
    * 본 프젝에서 도전해볼 것 이다.
```javascript
    // index.js

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
3. package.json에서 "start": "babel-node index.js" 로 변경 후 테스트 
    * 테스트 에러 -  npm install @babel/core 설치 후 다시 npm start 테스트
    
       ```javascript
      // package.json
      // start변경됨
      
        "scripts": {
          "start": "babel-node index.js"
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
       "start": "nodemon --exec babel-node index.js"
       },
          
       ```
* 이제 새로 저장할 떄마다 저절로 서버가 재실행된다.

## 트러블슈팅1.
* 바벨이 변환을 완료할때까지 기다리는 시간이 부족해서 서버가 자동으로 실행되는게 2번씩 실행될때가 있었다.
* 바벨의 변환시간을 2초정도 기다려 주기위해 package.json - scripts 변경

  ```javascript
  // package.json
          
    "scripts": {
    "start": "nodemon --exec babel-node index.js --delay 2"
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
  // index.js
  
  
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
          // index.js
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
          // index.js
      
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
* 설치 후 index.js 에 import morgan from "morgan"; 해주기 

#### morgan - tiny옵션 사용해보기
* 아래처럼 app.use 코딩해준 후 
````javascript

    // index.js
    
    // middlewares
    app.use(morgan("tiny"))

    // Routes
    app.get("/", handleHome);
    app.get("/profile", hndleProfile);
````
* npm start -> 브라우저에 http://localhost:4000/ or /profile 경로로 이동해주면 아래처럼 로깅정보가 찍힌다.
<img src="./images/tiny.png" width="500" height="500" />

#### morgan - combined옵션 사용해보기
* 어쩐종류 접속인지, 어떤 브라우저인지 등의 정보 표시
* 아래처럼 app.use 코딩해준 후 
````javascript

    // index.js
    
    // middlewares
    app.use(morgan("combined"))
  
    // Routes
    app.get("/", handleHome);
    app.get("/profile", hndleProfile);
````
* npm start -> 브라우저에 http://localhost:4000/ or /profile 경로로 이동해주면 아래처럼 로깅정보가 찍힌다.
<img src="./images/combined.png" width="500" height="500" />

### middleware - helmet 설치 후 사용해보기  ->  npm install helmet
* 보안관련 미들웨어 
* 설치 후 index.js 에 import helmet from "morgan"; 해주기 
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
* 설치 후 index.js 에 import bodyParser from "body-parser"; 해주기 

    ````javascript
      // index.js
  
      // middlewares
  
      app.use(bodyParser.json()) // json 받으면 이해하기
      app.use(bodyParser.urlencoded({extended : true}))
  
    ````

### middleware - cookie-parser 설치 후 사용해보기  ->  npm install cookie-parser
* cookie를 다루는데 도와준다. 유저로부터 받은 cookie를 이해하는 방법
* session을 다루기 위해서 cookie에 유저정보를 저장한다.
* 설치 후 index.js 에 import cookieParser from "cookie-parser"; 해주기 


### middleware 가 연결을 끊게할 수도 있다.
* 원한다면 미들웨어로 연결을 끊을 수 있다.
* 미들웨어가 res.sent를 실행하는 함수를 발동하면 (next()가 있어도) 연결이 끊긴다.
````javascript
    // index.js
    
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
<img src="./images/combined.png" width="300" height="300" />
