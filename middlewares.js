import routes from "./routes"

// pug - 템플릿에서 routes.js 접근하기
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  next();
};
