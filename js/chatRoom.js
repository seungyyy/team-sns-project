const sendBtn = document.querySelector('.writechat-sendtxt');
const commentInp = document.querySelector('.writechat-inp');

//채팅목록 클릭하면, 채팅방 상단 이름이 그거에 맞게 바뀜.
let userName = document.querySelector('.header-username');
userName.innerText = localStorage.getItem('chatUserName');
localStorage.removeItem('chatUserName');


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

// 헤더의 우측 상단 더보기를 누르면 모달 활성화.
//채팅방 나가기를 누르면 원래는 '채팅 내용이 삭제' 근데 일단 채팅목록으로 나가게 설정.
const modalOutCont = document.querySelector('.modal-out-container');
const modalOut = document.querySelector('.sec-modal');
const iconOut = document.querySelector('.img-more');
const outChatroom = document.querySelector('.modal-txt')

iconOut.addEventListener('click', () => {
  modalOut.style.display = 'block';
  modalOutCont.style.display = 'block';
  
});
if (!(modalOut.style.display == 'none')) { 
  outChatroom.addEventListener('click', () => {
    location.href = '../pages/chatList.html';
  });
  window.addEventListener('click', (e) => {
    e.target === modalOutCont ? 
    (modalOut.style.display = 'none',
    modalOutCont.style.display = 'none')
    : false;
  });
};


