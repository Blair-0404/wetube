
export const home = (req, res) => res.render("home", { pageTitle: "Home" }); // 첫인자 템플릿, 두번쨰인자 템플릿에 추가할 정보가 담긴객체
// 즉 pageTitle이 "home" 으로 전달됨
export const search = (req, res) => res.render("Search", { pageTitle: "Search" });

export const videos = (req, res) => res.render("videos");
export const upload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DeleteVideo" });

