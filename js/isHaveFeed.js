async function getFeed() {
  const res = await fetch('http://146.56.183.55:5050/post/feed', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  const posts = json.posts;
  console.log('홈피드 게시글', posts);

  let mainHomeHave = document.querySelector('.main-feed-have');
  let mainHomeNone = document.querySelector('.main-feed-none');
  let feedList = mainHomeHave.querySelector('.sec-upload');
  //피드가 있는지 없는지 판단 -> 다른 요소를 보여줌
  if (!posts.length) {
    if (!mainHomeHave.classList.contains('cont--hide')) {
      mainHomeHave.classList.add('cont--hide');
    }
    mainHomeNone.classList.remove('cont--hide');
  } else {
    mainHomeHave.classList.remove('cont--hide');
    if (!mainHomeNone.classList.contains('cont--hide')) {
      mainHomeNone.classList.add('cont--hide');
    }
    //게시물이 있을 경우 배열에서 게시물을 하나씩 꺼냄
    posts.forEach((post) => {
      let postImg = imgProcess(post.image);
      //날짜 수정
      let yearMonth = post.updatedAt.split('-');
      let day = yearMonth[2].split('T')[0];
      //하트 여부 확인
      let heartImg = !post.hearted
        ? '../images/icon/icon-heart.png'
        : '../images/icon/icon-heart-fill.png';
      //가상 li요소를 만들고 내용을 채워넣음
      let addItem = document.createElement('li');
      addItem.innerHTML = `
      <div href="../pages/profile.html" class="upload-user">
        <a href="../pages/otherProfile.html" class="upload-user-link">
          <img src="${post.author.image}" alt="user image" class="upload-userimg" onerror='this.src="http://146.56.183.55:5050/Ellipse.png"'>
          <div class="upload-user-txt">
            <p class="upload-title">${post.author.username}</p>
            <span class="upload-userId">@ ${post.author.accountname}</span>
          </div>
        </a>
      </div>
      <button type="button" class="post-btn-more btn--bgNone">
        <img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more">
      </button>
      <p class="upload-desc">${post.content}</p>
      <div class="space"></div>
      <div class="upload-icon">
        <button type="button" class="upload-btn-heart">
            <img src=${heartImg} alt="좋아요 아이콘">
            <span class="icon-txt">${post.heartCount}</span>
        </button>
        <a href="../pages/post.html" class="upload-btn-comment">
          <img src="../images/icon/s-icon-message-circle.png" alt="채팅 아이콘" class="chat-icon">
          <span class="icon-txt">${post.commentCount}</span>
        </a>
      </div>
      <p class="upload-data">${yearMonth[0]}년 ${yearMonth[1]}월 ${day}일</p>
      </div>
    `;
      //sec-upload ul에 li를 자식요소로 삽입한다.
      feedList.prepend(addItem);
      //이미지슬라이드와 연결
      document.querySelector('.space').prepend(postImg);
      let dots = document.querySelectorAll('.dot-list span');
      let imgSlide = document.querySelector('.imgSlide');
      dotClick(dots, imgSlide);
      //하트
      document.querySelector('.upload-btn-heart').addEventListener('click', () => {
        if (!post.hearted) {
          heartPlus(post.id);
        } else {
          heartCancel(post.id);
        }
      });
      //댓글 클릭시 게시글의 아이디를 전달한다.
      document.querySelector('.upload-btn-comment').addEventListener('click', () => {
        localStorage.setItem('postId', post.id);
      });
      //유저 클릭시 해당 유저 프로필로 이동하면서 해당 유저의 accountname를 기억한다.
      document.querySelector('.upload-user-link').addEventListener('click', () => {
        localStorage.setItem('postuploder', post.author.accountname);
      });
      modalDeclaration(post.id);
    });
  }
}
getFeed();
