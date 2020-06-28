import express from "express"
import routes from "../routes";
import { getUpload, postUpload, videoDetail, getEditVideo, postEditVideo, deleteVideo,  } from "../controllers/videoController"
import {uploadVideo, onlyPrivate} from "../middlewares";


const videoRouter = express.Router();


videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo); // 함수로 바뀐부분은 이렇게 () 호출을 해야 함수가 실행된다.

export default videoRouter