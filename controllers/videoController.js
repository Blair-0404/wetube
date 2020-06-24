import { videos } from "../db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
// res.render(첫인자 템플릿, 두번쨰인자 템플릿에 추가할 정보가 담긴객체)


export const search = (req, res) => {
  const {
    query: {term: searchingBy}
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const upload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DeleteVideo" });

