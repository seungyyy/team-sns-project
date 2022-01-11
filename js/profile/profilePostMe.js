async function profilePostMe() {
  const res = await fetch(
    "http://146.56.183.55:5050/post/" +
      localStorage.getItem("accountname") +
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
  console.log(posts);
  if (posts.length) {
    let postList = document.querySelector(".post-list");
    let postGrid = document.querySelector(".post-list-grid");
    posts.forEach((post) => {
      let addListItem = document.createElement("li");
      let addGridItem = document.createElement("li");
      addListItem.classList.add("post-item");
      addGridItem.classList.add("post-item-grid");
      //게시물 이미지가 있을 때 없을 때를 가정
      let postImg = post.image
        ? `<img src="${post.image}" alt="게시글 이미지" class="post-img"/>`
        : "";
      //업데이트 날짜 처리
      let yearMonth = post.updatedAt.split("-");
      let day = yearMonth[2].split("T")[0];
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
      <div class="post-cont-img">
        ${postImg}
      </div>
      <img
        src="../images/icon/s-icon-more-vertical.png"
        alt="더보기"
        class="post-btn-setting"
      />
      <div class="post-cont-icon">
        <button type="button" class="post-btn-icon">
          <img src="../images/icon/icon-heart.png" alt="좋아요" />
        </button>
        <span class="post-txt-icon">  ${post.heartCount}</span>
        <button type="button" class="post-btn-icon">
          <img
            src="../images/icon/s-icon-message-circle.png"
            alt="채팅하기"
          />
        </button>
        <span class="post-txt-icon">${post.commentCount}</span>
      </div>
      <p class="post-date">${yearMonth[0]}년 ${yearMonth[1]}월 ${day}일</p>
        `;

      addGridItem.innerHTML = `
        <a href="#" class="post-link-grid">
          <img
            src="${post.image}"
            alt="게시글 이미지"
            class="post-img-grid"
          />
        </a>
    `;

      postList.prepend(addListItem);
      if (post.image) {
        postGrid.prepend(addGridItem);
        ß;
      }
    });
  }
}
profilePostMe();
