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

export const uploadVideo = multerVideo.single('videoFile'); // single 오직한 파일만 ("들어올 파일이 이름")