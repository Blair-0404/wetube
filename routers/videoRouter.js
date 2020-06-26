import express from "express"
import routes from "../routes";
import { getUpload, postUpload, videoDetail, getEditVideo, postEditVideo, deleteVideo,  } from "../controllers/videoController"
import {uploadVideo} from "../middlewares";


const videoRouter = express.Router();


videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo); // 함수로 바뀐부분은 이렇게 () 호출을 해야 함수가 실행된다.

export default videoRouter