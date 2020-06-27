import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", {pageTitle: "Join"});
};

export const postJoin = async (req, res, next) => {
  const {
    body: {name, email, password, password2}
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", {pageTitle: "Join"});
  } else {
    try {
      // To Do: Register User(사용자 생성)
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do: Log user in
  }
};


export const getLogin = (req, res) => res.render("login", {pageTitle: "Log In"});

// postLogin 은 postJoin엣 next()로 진행된다. 그래서 정보들이 넘겨들어온 상태라서 여기서 passport.authenticate사용!
export const postLogin = passport.authenticate('local', { // 'local'은 내가 설치해준 Strategy 이다.
  // 옵션설정(공식문서 참고해보기)
  // 난 failureRedirect, successRedirect옵션 설정해주었다.

  failureRedirect: routes.login, // 만약 로그인에 실패(정도 잘못입력 등의 이유로)하면 login 페이지로 가도록
  successRedirect: routes.home
});


export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};
// export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");

