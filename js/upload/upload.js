function enterkey() {
  if (window.event.keyCode == 13) {
    createPost;
  }
}

async function createPost() {
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
      const res = await fetch(url+"/post",{
          method:"POST",
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
      const json = await res.json();
      alert('게시글이 업로드 되었습니다.');
      location.href = '../pages/home.html';
    }else{
        alert("이미지는 3개까지만 업로드 가능합니다.")
    }
}
