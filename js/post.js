const deletePost = document.querySelector('.post-wrap .post-user .img-more');
const modalDelete = document.querySelector('#modal-delete');
let reportComment = document.querySelectorAll('.comment-imgmore');
const modalDelCont = document.querySelector('.modal-delete-container');
const modalReport = document.querySelector('#modal-report');
const modalRepCont = document.querySelector('.modal-report-container');


deletePost.addEventListener('click', () => {
  modalDelete.classList.remove('modal-delete');
  modalDelCont.style.display = 'block';
  if (!(modalDelete.classList.contains('modal-delete'))) { 
    window.addEventListener('click', (e) => {
      e.target === modalDelCont ? 
      (modalDelete.classList.add('modal-delete'),
      modalDelCont.style.display = 'none')
      : false;
    });
  };
});

function report() {
  Array.from(reportComment).forEach(function(val) {
  val.addEventListener('click', () => {
    modalReport.classList.remove('modal-report');
    modalRepCont.style.display = 'block';
    if (!(modalReport.classList.contains('modal-report'))) { 
      window.addEventListener('click', (e) => {
        e.target === modalRepCont ? 
        (modalReport.classList.add('modal-report'),
        modalRepCont.style.display = 'none')
        : false;
      });
    };
  });
});
}
report();


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
  const pageDetail = document.querySelector('.sec-post-page');
  const commentDetail = document.querySelector('.post-comment');
  const imgLength = posts.image.split(',').length
  if((imgLength === 1)&&(posts.image)) {
    let imgPost = `      <div class="post-wrap">
    <div class="post-user">
      <img src="../images/icon/icon-profile.png" alt="user image" class="post-userimg">
      <div class="post-user-txt">
        <p class="post-title">${posts.author.username}</p>
        <span class="post-userId">@ ${posts.author.accountname}</span>
      </div>
      <button><img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more"></button>
    </div>
    <div class="post-txtimgwrap">
      <p class="post-txt">${posts.content}</p>
      <img src="${posts.image}" alt="some trees" class="post-img">
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
  } else if ((imgLength === 2)&&(posts.image)) {
    let imgPost = `      <div class="post-wrap">
    <div class="post-user">
      <img src="../images/icon/icon-profile.png" alt="user image" class="post-userimg">
      <div class="post-user-txt">
        <p class="post-title">${posts.author.username}</p>
        <span class="post-userId">@ ${posts.author.accountname}</span>
      </div>
      <button><img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more"></button>
    </div>
    <div class="post-txtimgwrap">
      <p class="post-txt">${posts.content}</p>
      <div class="post-imgmanywrap">
        <ul class="post-img-many">
          <li><img src="${posts.image.split(',')[0]}" alt="some trees" class="post-img"></li>
          <li><img src="${posts.image.split(',')[1]}" alt="some trees" class="post-img"></li>
        </ul>
        <ul class="post-imgmovebtn">
          <li><button type="button"></button></li>
          <li><button type="button"></button></li>
        </ul> 
      </div>
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
  } else if ((imgLength === 3)&&(posts.image)) {
    let imgPost = `      <div class="post-wrap">
    <div class="post-user">
      <img src="../images/icon/icon-profile.png" alt="user image" class="post-userimg">
      <div class="post-user-txt">
        <p class="post-title">${posts.author.username}</p>
        <span class="post-userId">@ ${posts.author.accountname}</span>
      </div>
      <button><img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more"></button>
    </div>
    <div class="post-txtimgwrap">
      <p class="post-txt">${posts.content}</p>
      <div class="post-imgmanywrap">
        <ul class="post-img-many">
          <li><img src="${posts.image.split(',')[0]}" alt="some trees" class="post-img"></li>
          <li><img src="${posts.image.split(',')[1]}" alt="some trees" class="post-img"></li>
          <li><img src="${posts.image.split(',')[2]}" alt="some trees" class="post-img"></li>
        </ul>
        <ul class="post-imgmovebtn">
          <li><button type="button"></button></li>
          <li><button type="button"></button></li>
          <li><button type="button"></button></li>
        </ul> 
      </div>
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
      <img src="../images/icon/icon-profile.png" alt="user image" class="post-userimg">
      <div class="post-user-txt">
        <p class="post-title">${posts.author.username}</p>
        <span class="post-userId">@ ${posts.author.accountname}</span>
      </div>
      <button><img src="../images/icon/s-icon-more-vertical.png" alt="더보기" class="img-more"></button>
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
          let imgsrc = comments[i].author.image
          if((comments[i].author.image).includes('url')){
            imgsrc = comments[i].author.image.split('"')[1]
          }
          comment = `
          <div class="comment-wrap">
          <div class="comment-userwrap">
            <div class="comment-user">
              <img src=${imgsrc} alt="" class="comment-userimg">
              <p class="comment-username">${comments[i].author.username}</p>
              <p class="comment-usertime">· 5분 전</p>
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
    reportComment = document.querySelectorAll('.comment-imgmore');
    commentInp.value = '';
    sendBtn.style.color = '#c4c4c4';
    sendBtn.disabled = true; 
    sendBtn.style.cursor = 'default';
    report();
  }

getComment()
