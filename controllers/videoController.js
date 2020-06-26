import routes from "../routes";
import Video from "../models/Video"; // 이건 Database의 element가 아니라 단지 model일 뿐 아예 다른 것 이다.
// element를 받는 통로일 뿐이지 element자체는 아니다.


export const home = async (req, res) => { // 비동기를 해주지 않으면 없는 video를 찾게된다.
  try {
    const videos = await Video.find({}); // Video.find({})로 Database에 있는 모든 Video를 가져오는 것을 기다려달라 해야한다.
    // throw Error("에러!"); // 에러가 나도 catch로 처리를 해줬기 때문에 home화면이 잘 그려질 것이다. // 하지만 try,catch가 아닌 상태에서 에러나면 Nodejs가 뻗어서 브라우저도 연결이 끊긴다.
    res.render("home", {pageTitle: "Home", videos}); // res.render(첫인자 템플릿, 두번쨰인자 템플릿에 추가할 정보가 담긴객체)
  } catch (error) { // 에러처리를 하지않으면 Video.find({})가 실패하더라도 res.render가 진행되서 꼬이기 때문에 에러처리 해줘야한다.
    console.log(error);
    res.render("home", {pageTitle: "Home", videos: []}); // 에러난경우(db에서 videos가져오기 실패한경우)에는 그냥 default로 빈 배열을 담기
  }
};


export const search = (req, res) => {
  const {
    query: {term: searchingBy}
  } = req;
  res.render("search", {pageTitle: "Search", searchingBy, videos});
};

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async (req, res) => {
  const {
    body: {title, description},
    file: {path} // multer 가 업도르한 파일을 받아서 file이란 객체를 준다. 그 안에 path가 있다.
  } = req;
  const newVideo = await Video.create({ // 생성했던 video model의 스키마 폼에 맞춰 real video element만들기!
    fileUrl: path,
    title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id)) // 위에서 비동기처리로 비디오 요소가 만들어진 후이기 때문에 id를 잘 뽑아낼 수 있다.
};

export const videoDetail = async (req, res) => {
  console.log(req.params); // { id: '5ef5ae14ba9c95358860c825' } 가 콘솔에 찍힌다
  // (routes.js에서 const VIDEO_DETAIL = "/:id"; 로 해줬기 떄문에)
  const {
    params: {id}
  } = req; // url변수인 id뽑기

  try {
    const video = await Video.findById(id); // video db에서 윗줄에서 뽑은 id와 같은 비디오 찾기!
    console.log(video); // 현재 보고있는 비디오의 상세정보 확인!
    res.render("videoDetail", {pageTitle: video.title, video: video}); // video: video로 템플릿에도 전달(화면에 video정보 뿌리기 위해)
  } catch (error) {
    console.log(error)
    res.redirect(routes.home);

  }
}


export const getEditVideo = async (req, res) => {
  const {
    params: {id} // id 가져오기
  } = req;
  try {
    const video = await Video.findById(id)
    res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});

  } catch (error) {
    res.redirect(routes.home);
  } // 만일 해당 비디오를 못찾으면 존재하지 않는 비디오를 수정하는 것이니 error처리로 home으로 보내기로 함
}


// 어떤 비디오를 수정하는지 알아야 한다.
export const postEditVideo = async (req, res) => {
  const {
    params: {id},
    body: {title, description} // db의 비디오 정보의 속성
  } = req;
  try {
    await Video.findOneAndUpdate({_id: id}, {title, description}) // 몽구스 문서참고하면서 적절한 함수 찾기
    // 이 기능은 서버에세 데이터 전송해서 업데이트 요청만하고 다시 무언가를 받아올 필요가 없기 떄문에 변수에 담지 않는 것 이다,
    res.redirect(routes.videoDetail(id)); // 수정된 비디오 정보가 잘 반영됬는지 확인하고싶다!
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: {id}
  } = req;
  try { // db에서 해당 비디오 찾아서 지우기
    await Video.findOneAndRemove({_id: id});
    res.render("deleteVideo", {pageTitle: "DeleteVideo"});
  } catch (error) {
    console.log(error)
  }
  res.redirect(routes.home) // 실패하던 성공하면 home으로 가고싶어서 밖으로 아예 뻈다.

}

