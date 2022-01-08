const deletePost = document.querySelector('.post-wrap .post-user .img-more');
const modalDelete = document.querySelector('#modal-delete');
const reportComment = document.querySelectorAll('.comment-imgmore');
const modalReport = document.querySelector('#modal-report');

const modalDelCont = document.querySelector('.modal-delete-container');
const modalRepCont = document.querySelector('.modal-report-container')

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

//하단 댓글 입력 창 - 입력되면, 버튼 활성화
const sendBtn = document.querySelector('.writechat-sendtxt');
const commentInp = document.querySelector('.writechat-inp');

commentInp.addEventListener('keyup', () => {
    switch (!(commentInp.value)) {
        case true: 
        sendBtn.style.color = '#c4c4c4';
        sendBtn.disabled = true; 
        break;
        case false:
        sendBtn.style.color = '#24732f';
        sendBtn.disabled = false; 
        break;
    };
});

//전송버튼 누르면 api 안에 있는 유저 정보 가져오고, 인풋 내용이 댓글창에 추가
//시간도 변경 가능하도록 추가
//댓글을 추가하면, commentReport가 안됨....(왜..?)
let comment = document.querySelector('.post-comment').innerHTML

sendBtn.addEventListener('click', () => {
  let userName = localStorage.getItem('username');
  let userImg = localStorage.getItem('image');
  comment = `\n
  <div class="comment-wrap">\n        
    <div class="comment-userwrap">\n          
      <div class="comment-user">\n            
        <img src=${userImg} alt="" class="comment-userimg">\n            
        <p class="comment-username">${userName}</p>\n            
        <p class="comment-usertime">· 방금전</p>\n          
      </div>\n          
      <img src="../images/icon/icon-more-vertical.png" alt="더보기" class="comment-imgmore">\n        
    </div>\n        
    <p class="comment-txt">${commentInp.value}</p>\n      
  </div>\n      ` + comment;
  document.querySelector('.post-comment').innerHTML = comment;
  commentInp.value = '';
  sendBtn.style.color = '#c4c4c4';
  sendBtn.disabled = true; 
});

