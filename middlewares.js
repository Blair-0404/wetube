import multer from "multer";
import routes from "./routes"

// 설치한 multer로 middleware 만들어보기
// const multerVideo = multer({ dest: "videos/" }); // 이제 업로드를 하면 multer가 uploads/videos/ 의 경로에 파일을 저장할 것 이다.
const multerVideo = multer({ dest: "uploads/videos/" }); // 이제 업로드를 하면 multer가 uploads/videos/ 의 경로에 파일을 저장할 것 이다.

// pug - 템플릿에서 routes.js 접근하기
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

// 로그인 되어 있는 상태라면 회원가입,로그인 등의 페이지로 시도할시 home으로 가게하는 미들웨어 생성
export const onlyPublic = (req, res, next) => {
  if (req.user) { // 하지만 이 로그인된 사용자가 누구인지 알수 있게 해주는것은 passport 와 session 덕이라는거 기억하기!
    res.redirect(routes.home); // join 할필요 없으니 홈으로 보내기
  } else {
    next()
  }
};

// 로그인 되어있는 회원만 개인정보 관련된 페이지도 이동할 수 있게하는 미들웨어 생성
export const onlyPrivate = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single('videoFile'); // single 오직한 파일만 ("들어올 파일이 이름")