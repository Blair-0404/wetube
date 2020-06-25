import routes from "../routes";
import Video from "../models/Video"; // 이건 Database의 element가 아니라 단지 model일 뿐 아예 다른 것 이다.
// element를 받는 통로일 뿐이지 element자체는 아니다.


export const home = async (req, res) => { // 비동기를 해주지 않으면 없는 video를 찾게된다.
  try{
    const videos = await Video.find({}); // Video.find({})로 Database에 있는 모든 Video를 가져오는 것을 기다려달라 해야한다.
    // throw Error("에러!"); // 에러가 나도 catch로 처리를 해줬기 때문에 home화면이 잘 그려질 것이다. // 하지만 try,catch가 아닌 상태에서 에러나면 Nodejs가 뻗어서 브라우저도 연결이 끊긴다.
    res.render("home", { pageTitle: "Home", videos }); // res.render(첫인자 템플릿, 두번쨰인자 템플릿에 추가할 정보가 담긴객체)
  } catch (error) { // 에러처리를 하지않으면 Video.find({})가 실패하더라도 res.render가 진행되서 꼬이기 때문에 에러처리 해줘야한다.
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] }); // 에러난경우(db에서 videos가져오기 실패한경우)에는 그냥 default로 빈 배열을 담기
  }
};


export const search = (req, res) => {
  const {
    query: {term: searchingBy}
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(324393))
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DeleteVideo" });

