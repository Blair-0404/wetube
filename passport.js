import passport from "passport";
import User from "./models/User";

// passport strategy(로그인하는 방식) 사용

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser()) // passport로 (session이 해독한 )쿠키가 넘어오면 deserializeUser함수가 실행된다.
                                                // deserialize로 사용자를 식별하게 되면 passport는 방금 찾은 그 사용자를 middleware 나 routes의 request Obj에 할당하게 된다.
                                                // 그래서 이제 어느 route에서든 로그인한 사용자가 누구인지 체크할 수 있게된다,
