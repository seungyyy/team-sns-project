async function profilePostMe() {
  const res = await fetch(
    "http://146.56.183.55:5050/post/" +
    localStorage.getItem("postuploder") +
    "/userpost", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  const json = await res.json();
  const posts = json.post;
  console.log("게시글", posts);
  if (posts.length) {
    let postList = document.querySelector(".post-list");
    let postGrid = document.querySelector(".post-list-grid");
    posts.forEach((post) => {
      let addListItem = document.createElement("li");
      let addGridItem = document.createElement("li");
      addListItem.classList.add("post-item");
      addGridItem.classList.add("post-item-grid");
      //게시물 이미지로 들어온 소스를 구분한다.
      let postImg = imgProcess(post.image); 
      //업데이트 날짜 처리
      let yearMonth = post.updatedAt.split("-");
      let day = yearMonth[2].split("T")[0];
      //하트 여부
      let heartImg = !post.hearted ?
        "../images/icon/icon-heart.png" :
        "../images/icon/icon-heart-fill.png";
      //li 안에 반복되는 코드를 삽입한다.
      addListItem.innerHTML = `
        <img
        src="${post.author.image}"
        alt="user image"
        class="post-img-user"
        onerror='this.src="../../images/icon/icon-profile.png"'
      />
      <div class="post-cont-txt">
        <p class="post-tit">
          <strong>${post.author.username}</strong>
        </p>
        <p class="post-name">@ ${post.author.accountname}</p>
        <p class="post-desc">
        ${post.content}
        </p>
      </div>
      <div class="space"></div>
        
        <button type="button" class="post-btn-more btn--bgNone">
        <img
          src="../images/icon/s-icon-more-vertical.png"
          alt="더보기"
          class="post-btn-setting"
        />
        </button>
      <div class="post-cont-icon">
        <button type="button" class="post-btn-heart">
          <img src=${heartImg} alt="좋아요" />
          <span class="post-txt-icon">  ${post.heartCount}</span>
        </button>
        <a href="../../pages/post.html" class="post-link-comment">
          <img
            src="../images/icon/s-icon-message-circle.png"
            alt="채팅하기"
          />
        </a>
        <span class="post-txt-icon">${post.commentCount}</span>
      </div>
      <p class="post-date">${yearMonth[0]}년 ${yearMonth[1]}월 ${day}일</p>
        `;

      addGridItem.innerHTML = `
        <a href="#" class="post-link-grid">
          <img
            src="${postImg}"
            alt="게시글 이미지"
            class="post-img-grid"
          />
        </a>
    `;
    
      postList.prepend(addListItem);
      if (postImg) {
        postGrid.prepend(addGridItem);
      }
      //이미지슬라이드와 연결
      document.querySelector(".space").prepend(postImg);
      let dots = document.querySelectorAll(".dot-list span");
      let imgSlide = document.querySelector(".imgSlide");
      dotClick(dots, imgSlide);
      //하트  
      document
        .querySelector(".post-btn-heart")
        .addEventListener("click", () => {
          if (!post.hearted) {
            heartPlus(post.id)
          } else {
            heartCancel(post.id)
          }
        });
      //댓글 클릭시 게시글의 아이디를 전달한다.
      document
        .querySelector(".post-link-comment")
        .addEventListener("click", () => {
          localStorage.setItem("postId", post.id);
        });
      //모달 신고창
      modalDeclaration(post.id);
    });
  }
}
profilePostMe();