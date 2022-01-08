let mainHomeHave = document.querySelector(".main-feed-have");
let feedList = mainHomeHave.querySelector(".sec-upload");
let mainHomeNone = document.querySelector(".main-none-home");
async function getFeed() {
  const res = await fetch("http://146.56.183.55:5050/post/feed", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  });
  const json = await res.json();
  const posts = json.posts;
  console.log(posts);
  if (!posts.length) {
    if (!mainHomeHave.classList.contains("nav--on")) {
      mainHomeHave.classList.add("cont--hide");
    }
    mainHomeNone.classList.remove("cont--hide");
  } else {
    mainHomeHave.classList.remove("cont--hide");
    if (!mainHomeNone.classList.contains("nav--on")) {
      mainHomeNone.classList.add("cont--hide");
    }
    posts.forEach((post, i) => {
      let addList = document.createElement("li");
      let yearMonth = post.updatedAt.split("-");
      let day = yearMonth[2].split("T")[0];
      console.log(day);
      addList.innerHTML = `
    <div class="upload-user">
    <img src="${post.author.image}" alt="user image" class="upload-userimg">
    <div class="upload-user-txt">
      <p class="upload-title">${post.author.username}</p>
      <span class="upload-userId">@ ${post.author.accountname}</span>
    </div>
    <img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more">
  </div>
  <p class="upload-desc">${post.content}</p>
  <div class="upload-imgBox"><img src="${post.image}" alt="some trees" class="upload-img"></div>
  <div class="upload-icon">
    <img src="../images/icon/icon-heart.png" alt="좋아요 아이콘">
    <span class="icon-txt">${post.heartCount}</span>
    <img src="../images/icon/s-icon-message-circle.png" alt="채팅 아이콘" class="chat-icon">
    <span class="icon-txt">${post.commentCount}</span>
  </div>
  <p class="upload-data">${yearMonth[0]}년 ${yearMonth[1]}월 ${day}일</p>
</div>
    `;
      feedList.prepend(addList);
    });
  }
}
getFeed();
