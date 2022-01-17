//하단 댓글 입력 창 - 입력되면, 버튼 활성화
const sendBtn = document.querySelector('.writechat-sendtxt');
const commentInp = document.querySelector('.writechat-inp');
//enter를 눌렀을 때도 실행
function enterkey() {
  if (window.event.keyCode == 13) {
    uploadComment();
  }
}

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

//전송버튼 누르면 api 안에 있는 유저 정보 가져오고, 인풋 내용이 댓글창에 추가
//시간도 변경 가능하도록 추가
let comment = document.querySelector('.post-comment').innerHTML

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
  const postAuthorImg = posts.author.image
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
          <img src="../images/icon/icon-heart.png" alt="좋아요 아이콘" class="like-icon">
          <span class="icon-txt">${posts.heartCount}</span>
          <img src="../images/icon/s-icon-message-circle.png" alt="채팅 아이콘" class="chat-icon">
          <span class="icon-txt">${posts.commentCount}</span>
        </div>
      </div>
      <p class="post-data">${posts.createdAt.slice(0,4)}년 ${posts.createdAt.slice(5,7)}월 ${posts.createdAt.slice(8,10)}일</p>
    </div>`

    pageDetail.innerHTML = imgPost;



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
        <img src="../images/icon/icon-heart.png" alt="좋아요 아이콘" class="like-icon">
        <span class="icon-txt">${posts.heartCount}</span>
        <img src="../images/icon/s-icon-message-circle.png" alt="채팅 아이콘" class="chat-icon">
        <span class="icon-txt">${posts.commentCount}</span>
      </div>
    </div>
    <p class="post-data">${posts.createdAt.slice(0,4)}년 ${posts.createdAt.slice(5,7)}월 ${posts.createdAt.slice(8,10)}일</p>
  </div>`
  pageDetail.innerHTML = imgPost;
  }
        document.querySelector(".space").prepend(postImg);
        let dots = document.querySelectorAll(".dot-list span");
        let imgSlide = document.querySelector(".imgSlide");
        dotClick(dots, imgSlide);
}
getPost();

//댓글 보여주기
async function getComment() {
  const res = await fetch(`http://146.56.183.55:5050/post/${localStorage.getItem("postId")}/comments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  })

  const json = await res.json();
  const comments = json.comments;
  const commentDetail = document.querySelector('.post-comment');
  if(comments.length === 0) {
      while(commentDetail.hasChildNodes()) { commentDetail.removeChild(commentDetail.firstChild)}
  } else {
    while(commentDetail.hasChildNodes()) { commentDetail.removeChild(commentDetail.firstChild)}
      for(let i = 0; i < comments.length; i++){
        const today = new Date();
        const timeValue = new Date(comments[i].createdAt);
        let timeForToday
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        const betweenTimeHour = Math.floor(betweenTime / 60);
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      
        if (betweenTime < 1) {
          timeForToday = '방금전';
        } else if (betweenTime < 60) {
          timeForToday =  betweenTime + '분 전';
        } else if (betweenTimeHour < 24) {
          timeForToday = betweenTimeHour + '시간 전';
        } else if (betweenTimeDay < 365) {
          timeForToday = betweenTimeDay + '일 전';
        } else {
          timeForToday = Math.floor(betweenTimeDay / 365) + '년 전'
        }
      
        let imgsrc = comments[i].author.image
        if(imgsrc) {
          if(imgsrc.includes('http://146.56.183.55:5050/')){
            imgsrc = imgsrc
          } else if(imgsrc.includes('http://146.56.183.55:5050')) {
            imgsrc = imgsrc.slice(0, 25) + '/' + postAuthorImg.slice(25)
          } else if(imgsrc.includes('url')) {
            imgsrc = imgsrc.split('"')[1]
          } else {
            imgsrc = 'http://146.56.183.55:5050/' + postAuthorImg
          }
      
        } else {
          imgsrc = 'http://146.56.183.55:5050/Ellipse.png'
        }
        comment = `
        <div class="comment-wrap">
        <div class="comment-userwrap">
          <div class="comment-user">
            <img src=${imgsrc} alt="" class="comment-userimg">
            <p class="comment-username">${comments[i].author.username}</p>
            <p class="comment-usertime">· ${timeForToday}</p>
          </div>
          <button class="btn--bgNone"><img src="../images/icon/icon-more-vertical.png" alt="더보기" class="comment-imgmore"></button>
        </div>
        <p class="comment-txt">${comments[i].content}</p>
      </div>`
        commentDetail.innerHTML = comment + commentDetail.innerHTML
      }
}}

// 입력하기
async function uploadComment() {
  const url = "http://146.56.183.55:5050"
  const token = localStorage.getItem("token")
  const postId = localStorage.getItem("postId")
  const commentUp = commentInp.value

    const res = await fetch(url+`/post/${postId}/comments`,{
        method:"POST",
        headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type" : "application/json"
        },
        body:JSON.stringify({
            "comment": {
                    "content": commentUp,
            }
        })
    })
    getComment()
    getPost()
    commentInp.value = '';
    sendBtn.style.color = '#c4c4c4';
    sendBtn.disabled = true; 
    sendBtn.style.cursor = 'default';


}

getComment();