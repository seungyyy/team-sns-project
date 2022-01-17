const chatList = document.querySelectorAll('.chatlist-userwrap');

Array.from(chatList).forEach(function(val) {
  val.addEventListener('click', e => {
    let userName = e.currentTarget.innerText.split('\n')[0];
    localStorage.setItem("chatUserName", userName);
    location.href = '../pages/chatRoom.html';
})});

