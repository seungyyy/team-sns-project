const sendBtn = document.querySelector('.writechat-sendtxt');
const commentInp = document.querySelector('.writechat-inp');
//enter를 눌렀을 때도 실행
function enterkey() {
  if (window.event.keyCode == 13) {
    uploadComment();
  }
}
//하단 댓글 입력 창 - 입력되면, 버튼 활성화
commentInp.addEventListener('keyup', () => {
    switch (!(commentInp.value)) {
        case true: 
        sendBtn.style.color = '#c4c4c4';
        sendBtn.disabled = true; 
        break;
        case false:
        sendBtn.style.color = '#24732f';
        sendBtn.disabled = false; 
        sendBtn.style.cursor = 'pointer';
        enterkey();
        break;
    };
  });

  sendBtn.addEventListener('click', () => {
    uploadComment(); 
  });

//말풍선 버튼을 누르면 게시글 상세로 이동
async function getPost() {
  const res = await fetch(`http://146.56.183.55:5050/post/${localStorage.getItem("postId")}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  })
  const json = await res.json();
  const posts = json.post;
  const pageDetail = document.querySelector('.main-post-page');
  const postAuthorImg = posts.author.image;

  let heartImg = !posts.hearted
  ? '../images/icon/icon-heart.png'
  : '../images/icon/icon-heart-fill.png';

  let authorImg
  if(postAuthorImg) {
    if(postAuthorImg.includes('http://146.56.183.55:5050/')){
      authorImg = postAuthorImg
    } else if(postAuthorImg.includes('http://146.56.183.55:5050')) {
      authorImg = postAuthorImg.slice(0, 25) + '/' + postAuthorImg.slice(25)
    } else if(postAuthorImg.includes('url')) {
      authorImg = postAuthorImg.split('"')[1]
    } else {
      authorImg = 'http://146.56.183.55:5050/' + postAuthorImg
    }
  } else {
    authorImg = 'http://146.56.183.55:5050/Ellipse.png'
  }
  const imgSplit = posts.image.split(',')
  const imgLength = posts.image.split(',').length
  let imgSrc 
  
  let postImg = imgProcess(posts.image);
  let postImgs
  if(posts.image) {
    if(imgSplit[0].indexOf("http://146.56.183.55:5050/")>-1){
      if((posts.image).includes('url')) {
        imgSrc = imgSplit
      } else {
        imgSrc = imgSplit
      }
    } else if(imgSplit[0].indexOf("http://146.56.183.55:5050")>-1){
      if(imgSplit[0].slice(-1) === '/') {
        imgSrc = []
        for(let i = 0; i<imgLength; i++) {
          imgSrc.push(imgSplit[i].slice(0, 25) + '/' + imgSplit[i].slice(25).slice(0, -1))
        }
      } else {
        imgSrc = []
        for(let i = 0; i<imgLength; i++) {
          imgSrc.push(imgSplit[i].slice(0, 25) + '/' + imgSplit[i].slice(25))
        }
      }
    } else {
      imgSrc = []
      for(let i = 0; i <imgLength; i++) {
        imgSrc.push("http://146.56.183.55:5050/" + imgSplit[i])
      }
    }

    if(imgLength === 1) {
      postImgs = `<img src=${imgSrc} alt="게시글 이미지" class="post-img"></img>`
    } else if(imgLength === 2) {
      postImgs = `
      <div class="space"></div>`
    } else if(imgLength ===3) {
      postImgs =   `
        <div class="space"></div>
        `
    }


    let imgPost = `      <div class="post-wrap">
      <div class="post-user">
        <img src=${authorImg} alt="user image" class="post-userimg">
        <div class="post-user-txt">
          <p class="post-title">${posts.author.username}</p>
          <span class="post-userId">@ ${posts.author.accountname}</span>
        </div>
        <img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more">
      </div>
      <div class="post-txtimgwrap">
        <p class="post-txt">${posts.content}</p>
        ${postImgs}
      </div>
      <div class="post-icon">
        <div class="icon-box">
          <button type="button" class="like-btn">
            <img src=${heartImg} alt="좋아요 아이콘" class="like-icon">
            </button>
            <span class="icon-txt">${posts.heartCount}</span>
          <img src="../images/icon/s-icon-message-circle.png" alt="채팅 아이콘" class="chat-icon">
          <span class="icon-txt">${posts.commentCount}</span>
        </div>
      </div>
      <p class="post-data">${posts.createdAt.slice(0,4)}년 ${posts.createdAt.slice(5,7)}월 ${posts.createdAt.slice(8,10)}일</p>
    </div>`

    pageDetail.innerHTML = imgPost;

    if(imgLength>=2){
      document.querySelector(".space").prepend(postImg);
      let dots = document.querySelectorAll(".dot-list span");
      let imgSlide = document.querySelector(".imgSlide");
      dotClick(dots, imgSlide);
    }
  } else {
    let imgPost = `      <div class="post-wrap">
    <div class="post-user">
      <img src=${authorImg} alt="user image" class="post-userimg">
      <div class="post-user-txt">
        <p class="post-title">${posts.author.username}</p>
        <span class="post-userId">@ ${posts.author.accountname}</span>
      </div>
      <img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more">
    </div>
    <div class="post-txtimgwrap">
      <p class="post-txt">${posts.content}</p>
    </div>
    <div class="post-icon">
      <div class="icon-box">
        <button type="button" class="like-btn">
          <img src=${heartImg} alt="좋아요 아이콘" class="like-icon">
          </button>
        <span class="icon-txt">${posts.heartCount}</span>
        </button>
        <img src="../images/icon/s-icon-message-circle.png" alt="채팅 아이콘" class="chat-icon">
        <span class="icon-txt">${posts.commentCount}</span>
      </div>
    </div>
    <p class="post-data">${posts.createdAt.slice(0,4)}년 ${posts.createdAt.slice(5,7)}월 ${posts.createdAt.slice(8,10)}일</p>
  </div>`
  pageDetail.innerHTML = imgPost;
  }

    document.querySelector('.like-btn').addEventListener('click', () => {
      if (!posts.hearted) {
        heartPlus(posts.id);
      } else {
        heartCancel(posts.id);
      }
    });

}
getPost();
