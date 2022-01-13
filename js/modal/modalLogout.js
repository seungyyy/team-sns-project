function modalLogout(){
  let contModal = document.querySelector(".modal-logout-outside");
  let dimm = contModal.querySelector(".dimm");
  //로그아웃 모달창
  let contLogoutModal = document.querySelector(".modal-logout");
  let logoutBtn = contLogoutModal.querySelector(".modal-item button");
  //로그아웃 재확인 모달창
  let contGideLogoutModal = document.querySelector(".modal-logoutTest");
  let guidelogoutBtn = contGideLogoutModal.querySelector(".modal-btn-logout");
  let guideCancelBtn = contGideLogoutModal.querySelector(".modal-gide-cancel");
  //헤더 버튼
  let headerMenu = document.querySelector(".header-btn");
  
  // 헤더 버튼 클릭시 모달창 표시
  headerMenu.addEventListener("click", () => {
    contModal.classList.remove("cont--hide");
  });
  // 모달창 외 부분 클릭시 모달창 해제
  dimm.addEventListener("click", () => {
    contModal.classList.add("cont--hide");
    contGideLogoutModal.classList.add("cont--hide");
    contLogoutModal.classList.remove("cont--hide");
  });
  //로그아웃 버튼 클릭시 로그아웃 재확인 모달창 표시
  logoutBtn.addEventListener("click", () => {
    contGideLogoutModal.classList.remove("cont--hide");
    contLogoutModal.classList.add("cont--hide");
  });
  //로그아웃 재확인의 로그아웃 클릭시 로그아웃
  guidelogoutBtn.addEventListener("click", () => {
    contModal.classList.add("cont--hide");
    contGideLogoutModal.classList.add("cont--hide");
    contLogoutModal.classList.remove("cont--hide");
    localStorage.clear();
    location.href = "../pages/login.html";
  });
  //로그아웃 재확인의 취소 클릭시
  guideCancelBtn.addEventListener("click", () => {
    contModal.classList.add("cont--hide");
    contGideLogoutModal.classList.add("cont--hide");
    contLogoutModal.classList.remove("cont--hide");
  });
}
modalLogout();