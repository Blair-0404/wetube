import mongoose from "mongoose";

// schema 생성하기
const VideoSchema = new mongoose.Schema({
  fileUrl: { // 주소를 넣을뿐 비디오 자체를 넣는것은 아니다.(너무무거워지기 떄문에) 비디오 자체는 서버(amazon)에 넣을 것 이다.
    type: String,
    required: "File URL is required" // error 메세지
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date ,
    default: Date.now
  }
});


// 모델생성 (위에서 만든 schema로 model 생성하기!)
const model = mongoose.model("Video", VideoSchema);  // 모델의 이름은 "Video" 이고, Video model의 schema는 VideoSchema 이다.

export default model;