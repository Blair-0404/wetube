import passport from "passport";
import User from "./models/User";

// passport strategy(로그인하는 방식) 사용

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())