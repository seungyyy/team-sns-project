function modalPost(id) {
    let contModal = document.querySelector(".modal-post-outside");
    let dimm = contModal.querySelector(".dimm");
    //삭제, 수정, 웹보기 모달창
    let contPostModal = document.querySelector(".modal-post");
    let deleteBtn = contPostModal.querySelector(".modal-item .modal-delete");
    let fixBtn = contPostModal.querySelector(".modal-item .modal-fix");
    //삭제 재확인 모달창
    let contGidePostModal = document.querySelector(".modal-postTest");
    let guideDeleteBtn = contGidePostModal.querySelector(".modal-btn-delete");
    let guideCancelBtn = contGidePostModal.querySelector(".modal-gide-cancel");
    let more = document.querySelector(".post-btn-more");
    // // more 버튼 클릭시 모달창 표시
    // more.addEventListener("click", () => {
    //     contModal.classList.remove("cont--hide");
    // });
    // 모달창 외 부분 클릭시 모달창 해제
    dimm.addEventListener("click", () => {
        contModal.classList.add("cont--hide");
        contGidePostModal.classList.add("cont--hide");
        contPostModal.classList.remove("cont--hide");
    });
    //삭제 버튼 클릭시 삭제 재확인 모달창 표시
    deleteBtn.addEventListener("click", () => {
        console.log(id)
        contGidePostModal.classList.remove("cont--hide");
        contPostModal.classList.add("cont--hide");
    });
    //수정 버튼 클릭시 수정 페이지로 이동
    fixBtn.addEventListener("click", () => {
        contModal.classList.add("cont--hide");
        contGidePostModal.classList.add("cont--hide");
        contPostModal.classList.remove("cont--hide");
        location.href = '../pages/home.html';
    });

    //삭제 재확인의 삭제 클릭시 삭제
    guideDeleteBtn.addEventListener("click", () => {
        deletePost(id);
    });

    //삭제 재확인의 취소 클릭시
    guideCancelBtn.addEventListener("click", () => {
        contModal.classList.add("cont--hide");
        contGidePostModal.classList.add("cont--hide");
        contPostModal.classList.remove("cont--hide");
    });
}