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


// 사용자를 깃헙으로 보낼때 함수
export const githubLogin = passport.authenticate("github"); // 2. 깃헙에 가서 passport.authenticate 인증실행


// 3-1 사용자가 깃헙으로 갔다가 돌아오면서 사용자 정보를 가져오면 실행되는 함수
// 내부는 npm passport-github 문서의 형식대로
export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => { // cb는 passport에서 제공된 함수
  // 그럼 cb는 언제 호출해야 할까? 인증에 성공한 상황에서 호출되야 한다.
  // 변경예쩡!! user생성으로
  const {_json: {id, avatar_url, name, email}} = profile; // 사용자가 가져온 정보들 중 필요한것 뽑아냄

  try {
    const user = await User.findOne({email: email}); // 깃헙으로부터 온 이메일과 동일한 이메일을 가진 사용자 찾기
    if(user) { // 깃헙으로 로그인 했을시 동일한 이메일 찾으면
      user.githubId = id; // 깃헙아이디를 사용자 아이디로 해주기
      user.save(); // 저장하기기
      return cb(null, user);
    }  // 만약 사용자 찾지 못하면 계정 만들
      const newUser = await User.create({ // 만약 사용자 찾지 못하면 계정 만들가
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      });
      return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }

};

// 5. 깃헙으로 사용자가 로그인이 잘 되면 또 어디론가 보내줘야 한다.
export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home) // 홈으로 보내기

};


export const logout = (req, res) => {
  // To Do: Process Log Out
  req.logout();
  res.redirect(routes.home);
};
// export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");

