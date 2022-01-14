//nav 배열을 반환 - 전역 변수 방지
function navSelector(){
  let navLinkHome = document.querySelector(".nav .nav-link-home");
  let navLinkChat = document.querySelector(".nav .nav-link-chat");
  let navLinkPost = document.querySelector(".nav .nav-link-post");
  let navLinkProfile = document.querySelector(".nav .nav-link-profile");
  let navLinkArr = [navLinkHome, navLinkChat, navLinkPost, navLinkProfile];
  return navLinkArr; 
}

//다른 클래스의 cont--hide를 초기상태로 돌리는 함수
function otherNavImgChange(num) {
  let navLinkArr = navSelector()
  navLinkArr.forEach((navLink, index) => {
    if (index != num) {
      navLink.classList.remove("nav--on");
      navLink.querySelectorAll("img")[0].classList.add("cont--hide");
      navLink.querySelectorAll("img")[1].classList.remove("cont--hide");
    }
  });
}

//nav의 한 링크를 클릭시 해당 클래스의 cont--hide클래스를 바꿔다는 함수
function navLinkClassChange() {
  let navLinkArr = navSelector()
  navLinkArr.forEach((navLink, index) => {
    navLink.addEventListener("click", () => {
      if (!navLink.classList.contains("nav--on")) {
        navLink.classList.add("nav--on");
        let navLinkImgName = navLink
          .querySelector("img")
          .classList[1].split("-")[2];
        navLink
          .querySelector(`.nav-img-${navLinkImgName}--on`)
          .classList.toggle("cont--hide");
        navLink
          .querySelector(`.nav-img-${navLinkImgName}--off`)
          .classList.toggle("cont--hide");
        otherNavImgChange(index);
      }
    });
  });
}
navLinkClassChange();
