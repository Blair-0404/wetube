
export const home = (req, res) => res.render("home"); // 확장자가 pug인 파일명을 render의 인자로
export const search = (req, res) => res.render("Search");

export const videos = (req, res) => res.render("videos");
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");

