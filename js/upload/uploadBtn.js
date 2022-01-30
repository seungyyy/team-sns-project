const inpTxT = document.querySelector('.upload-textarea');
const sendBtn = document.querySelector('.btn-MS--off');
const uploadImages = document.querySelector('.file-inp');

async function disabledBtn() {
  const childCount = document.querySelector('.upload-imgs').childElementCount;
  if((childCount>=1)||(inpTxT.value)) {
    sendBtn.style.backgroundColor = '#24732f';
    sendBtn.disabled = false;
    sendBtn.style.cursor = 'pointer';
    } else {
    sendBtn.style.backgroundColor = '#8ac392';
    sendBtn.disabled = true;
    sendBtn.style.cursor = 'default';
    }
}
disabledBtn()
inpTxT.addEventListener('keyup', () => {
  inpTxT.style.height = "1px";
  inpTxT.style.height = (20 + inpTxT.scrollHeight)+"px";
  disabledBtn();
});

sendBtn.addEventListener('click', createPost);

//이미지 미리보기
async function setThumbnail(e) {
  const childCount = document.querySelector('.upload-imgs').childElementCount;
  const url = "http://146.56.183.55:5050"
  const files = e.target.files;
  const imageUrls = [];
  for (let index = 0; index < files.length; index++) {
    const imgurl = await imageUpload(files,index)
    imageUrls.push(url+ '/' +imgurl)
  }
  
const imgCont = document.querySelector('.upload-imgs');

if (childCount + imageUrls.length <= 3){
  for (let i = 0; i < imageUrls.length; i++) {
    const imgUrls = imageUrls[i]
    imgwrap = `<div class="upload-imgwrap">  <img src="${imgUrls}" alt="이미지 미리보기" class="upload-img">    <img src="../images/icon/icon-x.png" alt="remove image" class="upload-removeimg">  </div>` + imgCont.innerHTML
    imgCont.innerHTML = imgwrap;
  }
} else {
  alert("이미지는 3개까지만 업로드 가능합니다.")
}
  if(imageUrls.length>= 1) {
    disabledBtn();
  }
  return imageUrls
}

uploadImages.addEventListener('change', setThumbnail);

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

window.addEventListener('click', e => { e.target.className === 'upload-removeimg' ? (e.target.parentNode.remove(), disabledBtn()) : false })
