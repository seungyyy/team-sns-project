//리스트 그리드 버튼
let postBtnGrid = document.querySelector(".post .post-btn-grid");
let postbtnList = document.querySelector(".post .post-btn-list");
//리스트, 그리드 컨테이너
let postContList = document.querySelector(".post .post-list");
let postContGrid = document.querySelector(".post .post-grid");

postBtnGrid.addEventListener("click", () => {
  if (postBtnGrid.classList.contains("post-btn-grid--off")) {
    //리스트, 그리드 버튼 on off
    postbtnList.classList.add("post-btn-list--off");
    postBtnGrid.classList.remove("post-btn-grid--off");
    //리스트, 그리드 컨테이너 on off
    postContGrid.classList.remove("cont--hide");
    postContList.classList.add("cont--hide");
  }
});
postbtnList.addEventListener("click", () => {
  if (postbtnList.classList.contains("post-btn-list--off")) {
    //리스트, 그리드 버튼 on off
    postbtnList.classList.remove("post-btn-list--off");
    postBtnGrid.classList.add("post-btn-grid--off");
    //리스트, 그리드 컨테이너 on off
    postContGrid.classList.add("cont--hide");
    postContList.classList.remove("cont--hide");
  }
});
