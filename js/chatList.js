const chatList = document.querySelectorAll('.chatlist-usertxtwrap');

Array.from(chatList).forEach(function(val) {
  val.addEventListener('click', () => {
  location.href = '../pages/chatRoom.html'
})});