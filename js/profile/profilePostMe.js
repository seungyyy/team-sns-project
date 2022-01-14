async function profilePostMe() {
  const res = await fetch(
    "http://146.56.183.55:5050/post/" +
    localStorage.getItem("accountname")+
      "/userpost",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  const json = await res.json();
  const posts = json.post;
  console.log("게시글 정보", posts);
  // 게시글이 없는지 있는지 판단
  if (posts.length) {
    let postList = document.querySelector(".post-list");
    let postGrid = document.querySelector(".post-list-grid");
    posts.forEach((post) => {
      //게시물 이미지로 들어온 소스를 구분한다.
      let postImg; 
      if(post.image==""){
        postImg=``;
      }else{
        postImg =post.image.split(",")[0].indexOf("http://146.56.183.55:5050/")>-1 ?
         post.image.split(",")[0] : 
         "http://146.56.183.55:5050/" + post.image.split(",")[0];
      }
      let listImg =  postImg ? `
      <div class="post-cont-img">
        <img src=${postImg} alt="게시글 이미지" class="post-img"/>
      </div>
      `: "<div class='post-cont-space'></div>";
      //업데이트 날짜 처리
      let yearMonth = post.updatedAt.split("-");
      let day = yearMonth[2].split("T")[0];
       //하트 여부
       let heartImg = !post.hearted ? 
       "../images/icon/icon-heart.png" :
       "../images/icon/icon-heart-fill.png" ;
      let addListItem = document.createElement("li");
      let addGridItem = document.createElement("li");
      addListItem.classList.add("post-item");
      addGridItem.classList.add("post-item-grid");
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
        ${listImg}
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
      //하트
      document
      .querySelector(".post-btn-heart")
      .addEventListener("click", () => {
        if(!post.hearted){
          heartPlus(post.id)
        }else{
          heartCancel(post.id)
        }
      });
      //댓글 클릭시 게시글의 아이디를 전달한다.
      document
        .querySelector(".post-link-comment")
        .addEventListener("click", () => {
          localStorage.setItem("postId", post.id);
        });
      //글 모달
      modalPost(post.id);
    });
  }
}
profilePostMe();

