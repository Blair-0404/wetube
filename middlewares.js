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
export const onlyPublic = (req, res, next) => {
  // 사용자가 있는 상태라면
  if (req.user) { // 하지만 이 로그인된 사용자가 누구인지 알수 있게 해주는것은 passport 와 session 덕이라는거 기억하기!
    res.redirect(routes.home); // join 할필요 없으니 홈으로 보내기
  } else {
    next()
  }
};

export const uploadVideo = multerVideo.single('videoFile'); // single 오직한 파일만 ("들어올 파일이 이름")