function enterkey() {
  if (window.event.keyCode == 13) {
    fixPost;
  }
}

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
    console.log(posts.author._id == localStorage.getItem('_id'))
    console.log(posts.content)
    
    const getImgs = posts.image.split(',');
    console.log(getImgs)
    const imgCont = document.querySelector('.upload-imgs');
    if(posts.image){
      for (let i = getImgs.length-1; i >= 0 ; i--) {
        const getImg = getImgs[i];
        imgwrap = `<div class="upload-imgwrap">  <img src="${getImg}" alt="이미지 미리보기" class="upload-img">    <img src="../images/icon/icon-x.png" alt="remove image" class="upload-removeimg">  </div>` + imgCont.innerHTML
        imgCont.innerHTML = imgwrap;
      }
    }
    inpTxT.value = `${posts.content}`;
    headerName.textContent = '게시글 수정';
  
}

  getPost();


async function fixPost() {
  const url = "http://146.56.183.55:5050"
  const token = localStorage.getItem("token")
  const contentText = inpTxT.value

  const imageUrls = [];
  const imgurl = document.querySelectorAll('.upload-img')

  const files = uploadImages.files
  if (files.length<=3) {
    for(let i = 0; i <imgurl.length;i++){
      imageUrls.push(imgurl[i].currentSrc);
    }
    const res = await fetch(url+`/post/${localStorage.getItem('postId')}`,{
        method:"PUT",
        headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type" : "application/json"
        },
        body:JSON.stringify({
            "post": {
                    "content": contentText,
                    "image": imageUrls+'' 
            }
        })
    })
    alert('게시글이 수정 되었습니다.');
    location.href = '../pages/profile.html';
  }else{
      alert("이미지는 3개까지만 업로드 가능합니다.")
  }
}

sendBtn.addEventListener('click', () => {
  if(headerName.textContent === "게시글 작성") {
    createPost();
    console.log('업로드');
  } else if(headerName.textContent === "게시글 수정") {
    fixPost();
    console.log('수정');
  }
});
