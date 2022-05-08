if(localStorage.getItem('postId')){
  const headerName = document.querySelector('.upload-heading');


function enterkey() {
  if (window.event.keyCode == 13) {
    fixPost;
  }
}

async function getPost() {
  const res = await fetch(
    `https://mandarin.api.weniv.co.kr/post/${localStorage.getItem('postId')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }
  );
  const json = await res.json();
  const posts = json.post;
  let userImg = document.querySelector('.upload-userimg').src;
  userImg = posts.author.image;
  document.querySelector('.upload-userimg').src = userImg;
    
    const getImgs = posts.image.split(',');
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
  const url = 'https://mandarin.api.weniv.co.kr';
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
  } else if(headerName.textContent === "게시글 수정") {
    fixPost();
  }
});
}