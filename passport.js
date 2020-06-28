import passport from "passport";
import GithubStrategy from "passport-github"; // GithubStrategy가져오
import User from "./models/User";
import {githubLoginCallback} from "./controllers/userController";
import routes from "./routes"

// passport strategy(로그인하는 방식) 사용
passport.use(User.createStrategy());


// 3. 사용자가 깃헙에 가서 돌아올떄
passport.use(new GithubStrategy({ // passport에게 GithubStrategy를 사용하라고 하는 부분
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}` // 내가 알려준 이 콜백 URL로 돌아온다.
  }, githubLoginCallback // 사용자가 깃헙으로 갔다가 돌아오면서 사용자 정보를 가져오면 실행되는 함수
  )
);

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser()) // passport로 (session이 해독한 )쿠키가 넘어오면 deserializeUser함수가 실행된다.
// deserialize로 사용자를 식별하게 되면 passport는 방금 찾은 그 사용자를 middleware 나 routes의 request Obj에 할당하게 된다.
// 그래서 이제 어느 route에서든 로그인한 사용자가 누구인지 체크할 수 있게된다,
