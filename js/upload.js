const inpTxT = document.querySelector('.upload-textarea');
const sendBtn = document.querySelector('.btn-MS--off');

function enterkey() {
  if (window.event.keyCode == 13) {
    createPost;
  }
}




async function disabledBtn() {
  const childCount = document.querySelector('.upload-imgs').childElementCount;
  if((childCount>=1)||(inpTxT.value)) {
    sendBtn.style.backgroundColor = '#24732f';
    sendBtn.disabled = false;
    sendBtn.style.cursor = 'pointer';
    } else {
    sendBtn.style.backgroundColor = '#8ac392';
    sendBtn.disabled = true;
    }
}

inpTxT.addEventListener('keyup', () => {
  inpTxT.style.height = "1px";
  inpTxT.style.height = (20 + inpTxT.scrollHeight)+"px";
  disabledBtn();
});



//프로필 사진 (내 사진으로) 변경
const userImage = document.querySelector('.upload-userimg');
userImage.src = localStorage.image;

const uploadImages = document.querySelector('.file-inp');

async function imageUpload(files,index){
  const formData = new FormData();
  formData.append("image", files[index]);
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  return productImgName
}

//여기부터
async function imageUpload(files,index){
    const formData = new FormData();
    formData.append("image", files[index]);//formData.append("키이름","값")
    const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST",
        body : formData
    })
    const data = await res.json()
    const productImgName = data["filename"];
    return productImgName
}
async function createPost() {
    const url = "http://146.56.183.55:5050"
    const token = localStorage.getItem("token")
    const contentText = inpTxT.value

    const imageUrls = [];
    const imgurl = document.querySelectorAll('.upload-img')

    // const imageUrls = []
    const files = uploadImages.files
    if (files.length<=3) {
        // for (let index = 0; index < files.length; index++) {
        //     const imgurl = await imageUpload(files,index)
        //     imageUrls.push(url+ '/' +imgurl)
        // }
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
      const json = await res.json()
      console.log(json);
      alert('게시물이 업로드 되었습니다.');
      location.href = '../pages/home.html';
    }else{
        alert("이미지는 3개까지만 업로드 가능합니다.")
    }
}

  //이미지 미리보기
async function setThumbnail(e) {
  const url = "http://146.56.183.55:5050"
  const files = e.target.files;
  const imageUrls = [];
  for (let index = 0; index < files.length; index++) {
    const imgurl = await imageUpload(files,index)
    imageUrls.push(url+ '/' +imgurl)
  }
  const imgCont = document.querySelector('.upload-imgs');
  for (let i = 0; i < imageUrls.length; i++) {
    const imgUrls = imageUrls[i]
    imgwrap = `<div class="upload-imgwrap">  <img src="${imgUrls}" alt="some trees" class="upload-img">    <img src="../images/icon/icon-x.png" alt="remove image" class="upload-removeimg">  </div>` + imgCont.innerHTML
    imgCont.innerHTML = imgwrap;
  }
  if(imageUrls.length>= 1) {
    disabledBtn();
  }
  return imageUrls
}

uploadImages.addEventListener('change', ()=> {
  const childCount = document.querySelector('.upload-imgs').childElementCount;
  if((childCount + imageUrls.length)>3 ) {
    alert("이미지는 3개까지만 업로드 가능합니다.");
} else {
  setThumbnail}});
//여기까지 이미지 여러개 업로드하기.
sendBtn.addEventListener('click', createPost)

//이미지 삭제
window.addEventListener('click', e => { e.target.className === 'upload-removeimg' ? e.target.parentNode.remove() : false })

