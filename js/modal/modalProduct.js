function modalProduct(id) {
    let contModal = document.querySelector(".modal-product-outside");
    let dimm = contModal.querySelector(".dimm");
    //삭제, 수정, 웹보기 모달창
    let contPostModal = document.querySelector(".modal-product");
    let deleteBtn = contPostModal.querySelector(".modal-item .modal-delete");
    let fixBtn = contPostModal.querySelector(".modal-item .modal-fix");
    let webBtn = contPostModal.querySelector(".modal-item .modal-web");
    //삭제 재확인 모달창
    let contGidePostModal = document.querySelector(".modal-productTest");
    let guideDeleteBtn = contGidePostModal.querySelector(".modal-btn-delete");
    let guideCancelBtn = contGidePostModal.querySelector(".modal-gide-cancel");
    // let more = document.querySelector(".product-btn");
    // // more 버튼 클릭시 모달창 표시
    // more.addEventListener("click", () => {
    //     contModal.classList.remove("cont--hide");
    //     }
    // );
    // 모달창 외 부분 클릭시 모달창 해제
    console.log(id)
    dimm.addEventListener("click", () => {
        contModal.classList.add("cont--hide");
        contGidePostModal.classList.add("cont--hide");
        contPostModal.classList.remove("cont--hide");
    });
    //삭제 버튼 클릭시 삭제 재확인 모달창 표시
    deleteBtn.addEventListener("click", () => {
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
        deleteProduct(id);
    });

    //삭제 재확인의 취소 클릭시
    guideCancelBtn.addEventListener("click", () => {
        contModal.classList.add("cont--hide");
        contGidePostModal.classList.add("cont--hide");
        contPostModal.classList.remove("cont--hide");
    });
}