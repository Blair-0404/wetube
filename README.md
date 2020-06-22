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