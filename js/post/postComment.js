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
  let comment = document.querySelector('.post-comment').innerHTML;
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
            imgsrc = imgsrc.slice(0, 25) + '/' + imgsrc.slice(25)
          } else if(imgsrc.includes('url')) {
            imgsrc = imgsrc.split('"')[1]
          } else {
            imgsrc = 'http://146.56.183.55:5050/' + imgsrc
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
}
}

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
    commentInp.value = '';
    sendBtn.style.color = '#c4c4c4';
    sendBtn.disabled = true; 
    sendBtn.style.cursor = 'default';
    

}

getComment();